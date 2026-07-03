import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { slugify } from '../../common/utils/slugify';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksQueryDto } from './dto/books-query.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const slug = slugify(createBookDto.title);

    // Check if slug or isbn already exists
    const existingSlug = await this.bookModel.findOne({ slug });
    if (existingSlug) {
      throw new ConflictException(
        'Book with this title already exists (duplicate slug)',
      );
    }

    const existingIsbn = await this.bookModel.findOne({
      isbn: createBookDto.isbn,
    });
    if (existingIsbn) {
      throw new ConflictException('Book with this ISBN already exists');
    }

    const book = new this.bookModel({
      ...createBookDto,
      slug,
      availableCopies: createBookDto.totalCopies, // initially equal to totalCopies
    });

    return book.save();
  }

  async findAll(queryDto: BooksQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category,
      author,
      status,
    } = queryDto;

    const filter: any = {};

    if (category) {
      filter.category = new Types.ObjectId(category);
    }
    if (author) {
      filter.author = new Types.ObjectId(author);
    }
    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.bookModel
        .find(filter)
        .populate('author')
        .populate('category')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.bookModel.countDocuments(filter).exec(),
    ]);

    return {
      success: true,
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<BookDocument> {
    const book = await this.bookModel
      .findById(id)
      .populate('author')
      .populate('category')
      .exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async findBySlug(slug: string): Promise<BookDocument> {
    const book = await this.bookModel
      .findOne({ slug })
      .populate('author')
      .populate('category')
      .exec();
    if (!book) {
      throw new NotFoundException(`Book with slug ${slug} not found`);
    }
    return book;
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookDocument> {
    const book = await this.findOne(id);
    const updates: any = { ...updateBookDto };

    if (updateBookDto.title) {
      updates.slug = slugify(updateBookDto.title);
      const existing = await this.bookModel.findOne({
        slug: updates.slug,
        _id: { $ne: id },
      });
      if (existing) {
        throw new ConflictException('Book with this title already exists');
      }
    }

    if (updateBookDto.isbn) {
      const existing = await this.bookModel.findOne({
        isbn: updateBookDto.isbn,
        _id: { $ne: id },
      });
      if (existing) {
        throw new ConflictException('Book with this ISBN already exists');
      }
    }

    // Adjust availableCopies if totalCopies changes
    if (updateBookDto.totalCopies !== undefined) {
      const diff = updateBookDto.totalCopies - book.totalCopies;
      const newAvailable = book.availableCopies + diff;
      if (newAvailable < 0) {
        throw new ConflictException(
          'Cannot reduce total copies below currently borrowed copies',
        );
      }
      updates.availableCopies = newAvailable;
    }

    const updated = await this.bookModel
      .findByIdAndUpdate(id, updates, { new: true })
      .populate('author')
      .populate('category')
      .exec();

    if (!updated) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return { message: 'Book successfully deleted' };
  }

  async adjustAvailableCopies(
    id: string,
    amount: number,
  ): Promise<BookDocument> {
    const updated = await this.bookModel
      .findByIdAndUpdate(
        id,
        { $inc: { availableCopies: amount } },
        { new: true },
      )
      .exec();
    if (!updated) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updated;
  }

  async countAll(): Promise<number> {
    return this.bookModel.countDocuments().exec();
  }
}
