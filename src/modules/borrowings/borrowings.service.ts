import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BooksService } from '../books/books.service';
import { BorrowingStatus, BookStatus } from '../../common/constants';
import { Borrowing, BorrowingDocument } from './schemas/borrowing.schema';
import { BorrowBookDto } from './dto/borrow-book.dto';

@Injectable()
export class BorrowingsService {
  constructor(
    @InjectModel(Borrowing.name)
    private borrowingModel: Model<BorrowingDocument>,
    private booksService: BooksService,
  ) {}

  async borrowBook(
    userId: string,
    borrowDto: BorrowBookDto,
  ): Promise<BorrowingDocument> {
    const book = await this.booksService.findOne(borrowDto.bookId);

    // Rule: Book status must be AVAILABLE and availableCopies > 0
    if (book.status !== BookStatus.AVAILABLE || book.availableCopies <= 0) {
      throw new BadRequestException(
        'Book is currently unavailable or out of stock',
      );
    }

    // Rule: Prevent borrowing same book twice if not returned
    const activeBorrowing = await this.borrowingModel.findOne({
      user: new Types.ObjectId(userId),
      book: book._id,
      status: { $in: [BorrowingStatus.BORROWED, BorrowingStatus.OVERDUE] },
    });

    if (activeBorrowing) {
      throw new ConflictException(
        'You have already borrowed this book and not returned it yet',
      );
    }

    // Calculate due date (default 14 days)
    const borrowDate = new Date();
    const dueDate = borrowDto.dueDate
      ? new Date(borrowDto.dueDate)
      : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    if (dueDate <= borrowDate) {
      throw new BadRequestException('Due date must be in the future');
    }

    // Decrease book available copies
    await this.booksService.adjustAvailableCopies(
      (book._id as any).toString(),
      -1,
    );

    const borrowing = new this.borrowingModel({
      user: new Types.ObjectId(userId),
      book: book._id,
      borrowDate,
      dueDate,
      status: BorrowingStatus.BORROWED,
    });

    return borrowing.save();
  }

  async returnBook(id: string): Promise<BorrowingDocument> {
    const borrowing = await this.borrowingModel.findById(id).exec();
    if (!borrowing) {
      throw new NotFoundException(`Borrowing record with ID ${id} not found`);
    }

    if (borrowing.status === BorrowingStatus.RETURNED) {
      throw new BadRequestException('This book has already been returned');
    }

    borrowing.returnDate = new Date();
    borrowing.status = BorrowingStatus.RETURNED;
    await borrowing.save();

    // Increase book available copies
    await this.booksService.adjustAvailableCopies(borrowing.book.toString(), 1);

    return borrowing.populate(['user', 'book']);
  }

  async findAll(): Promise<BorrowingDocument[]> {
    await this.updateOverdueStatuses();
    return this.borrowingModel.find().populate(['user', 'book']).exec();
  }

  async findByUserId(userId: string): Promise<BorrowingDocument[]> {
    await this.updateOverdueStatuses();
    return this.borrowingModel
      .find({ user: new Types.ObjectId(userId) })
      .populate(['user', 'book'])
      .exec();
  }

  async findOverdue(): Promise<BorrowingDocument[]> {
    await this.updateOverdueStatuses();
    return this.borrowingModel
      .find({ status: BorrowingStatus.OVERDUE })
      .populate(['user', 'book'])
      .exec();
  }

  async findById(id: string): Promise<BorrowingDocument | null> {
    return this.borrowingModel.findById(id).populate(['user', 'book']).exec();
  }

  // Update borrowings to OVERDUE if they are past due date and not returned
  async updateOverdueStatuses(): Promise<void> {
    const now = new Date();
    await this.borrowingModel.updateMany(
      {
        status: BorrowingStatus.BORROWED,
        dueDate: { $lt: now },
      },
      {
        $set: { status: BorrowingStatus.OVERDUE },
      },
    );
  }

  async countAll(): Promise<number> {
    return this.borrowingModel.countDocuments().exec();
  }

  async countBorrowed(): Promise<number> {
    return this.borrowingModel
      .countDocuments({
        status: { $in: [BorrowingStatus.BORROWED, BorrowingStatus.OVERDUE] },
      })
      .exec();
  }

  async countOverdue(): Promise<number> {
    await this.updateOverdueStatuses();
    return this.borrowingModel
      .countDocuments({ status: BorrowingStatus.OVERDUE })
      .exec();
  }
}
