import { BorrowingsService } from './borrowings.service';
import { BorrowBookDto } from './dto/borrow-book.dto';
export declare class BorrowingsController {
    private readonly borrowingsService;
    constructor(borrowingsService: BorrowingsService);
    borrowBook(userId: string, borrowBookDto: BorrowBookDto): Promise<import("./schemas/borrowing.schema").BorrowingDocument>;
    returnBook(id: string): Promise<import("./schemas/borrowing.schema").BorrowingDocument>;
    findAll(): Promise<import("./schemas/borrowing.schema").BorrowingDocument[]>;
    findMyBorrowings(userId: string): Promise<import("./schemas/borrowing.schema").BorrowingDocument[]>;
    findOverdue(): Promise<import("./schemas/borrowing.schema").BorrowingDocument[]>;
}
