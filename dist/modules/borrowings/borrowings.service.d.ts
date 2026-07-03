import { Model } from 'mongoose';
import { BooksService } from '../books/books.service';
import { BorrowingDocument } from './schemas/borrowing.schema';
import { BorrowBookDto } from './dto/borrow-book.dto';
export declare class BorrowingsService {
    private borrowingModel;
    private booksService;
    constructor(borrowingModel: Model<BorrowingDocument>, booksService: BooksService);
    borrowBook(userId: string, borrowDto: BorrowBookDto): Promise<BorrowingDocument>;
    returnBook(id: string): Promise<BorrowingDocument>;
    findAll(): Promise<BorrowingDocument[]>;
    findByUserId(userId: string): Promise<BorrowingDocument[]>;
    findOverdue(): Promise<BorrowingDocument[]>;
    findById(id: string): Promise<BorrowingDocument | null>;
    updateOverdueStatuses(): Promise<void>;
    countAll(): Promise<number>;
    countBorrowed(): Promise<number>;
    countOverdue(): Promise<number>;
}
