import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Book, BookDocument } from '../books/schemas/book.schema';
import { Author, AuthorDocument } from '../authors/schemas/author.schema';
import {
  Category,
  CategoryDocument,
} from '../categories/schemas/category.schema';
import {
  Borrowing,
  BorrowingDocument,
} from '../borrowings/schemas/borrowing.schema';
import { Fine, FineDocument } from '../fines/schemas/fine.schema';
import { BorrowingStatus, FineStatus } from '../../common/constants';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Borrowing.name)
    private borrowingModel: Model<BorrowingDocument>,
    @InjectModel(Fine.name) private fineModel: Model<FineDocument>,
  ) {}

  async getStats() {
    // 1. Total counts
    const [totalUsers, totalBooks, totalAuthors, totalCategories] =
      await Promise.all([
        this.userModel.countDocuments().exec(),
        this.bookModel.countDocuments().exec(),
        this.authorModel.countDocuments().exec(),
        this.categoryModel.countDocuments().exec(),
      ]);

    // 2. Borrowing counts
    const [totalBorrowed, totalOverdue] = await Promise.all([
      this.borrowingModel
        .countDocuments({
          status: { $in: [BorrowingStatus.BORROWED, BorrowingStatus.OVERDUE] },
        })
        .exec(),
      this.borrowingModel
        .countDocuments({ status: BorrowingStatus.OVERDUE })
        .exec(),
    ]);

    // 3. Fines stats
    const finesAggregate = await this.fineModel.aggregate([
      {
        $group: {
          _id: null,
          totalCollected: {
            $sum: {
              $cond: [{ $eq: ['$status', FineStatus.PAID] }, '$amount', 0],
            },
          },
          totalPending: {
            $sum: {
              $cond: [{ $eq: ['$status', FineStatus.UNPAID] }, '$amount', 0],
            },
          },
          totalWaived: {
            $sum: {
              $cond: [{ $eq: ['$status', FineStatus.WAIVED] }, '$amount', 0],
            },
          },
        },
      },
    ]);

    const fineStats = finesAggregate[0] || {
      totalCollected: 0,
      totalPending: 0,
      totalWaived: 0,
    };

    // 4. Recent borrowings (latest 5)
    const recentBorrowings = await this.borrowingModel
      .find()
      .populate(['user', 'book'])
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();

    // 5. Most borrowed books (top 5)
    const mostBorrowedAggregate = await this.borrowingModel.aggregate([
      {
        $group: {
          _id: '$book',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const mostBorrowedBooks = await Promise.all(
      mostBorrowedAggregate.map(async (item) => {
        const book = await this.bookModel
          .findById(item._id)
          .populate(['author', 'category'])
          .exec();
        return {
          book,
          borrowCount: item.count,
        };
      }),
    );

    return {
      counts: {
        users: totalUsers,
        books: totalBooks,
        authors: totalAuthors,
        categories: totalCategories,
        borrowedBooks: totalBorrowed,
        overdueBooks: totalOverdue,
      },
      fines: {
        collected: fineStats.totalCollected,
        pending: fineStats.totalPending,
        waived: fineStats.totalWaived,
        total:
          fineStats.totalCollected +
          fineStats.totalPending +
          fineStats.totalWaived,
      },
      recentBorrowings,
      mostBorrowedBooks: mostBorrowedBooks.filter((b) => b.book !== null),
    };
  }
}
