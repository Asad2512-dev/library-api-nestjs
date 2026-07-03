import { Model } from 'mongoose';
import { UserDocument } from '../users/schemas/user.schema';
import { Book, BookDocument } from '../books/schemas/book.schema';
import { AuthorDocument } from '../authors/schemas/author.schema';
import { CategoryDocument } from '../categories/schemas/category.schema';
import { Borrowing, BorrowingDocument } from '../borrowings/schemas/borrowing.schema';
import { FineDocument } from '../fines/schemas/fine.schema';
export declare class DashboardService {
    private userModel;
    private bookModel;
    private authorModel;
    private categoryModel;
    private borrowingModel;
    private fineModel;
    constructor(userModel: Model<UserDocument>, bookModel: Model<BookDocument>, authorModel: Model<AuthorDocument>, categoryModel: Model<CategoryDocument>, borrowingModel: Model<BorrowingDocument>, fineModel: Model<FineDocument>);
    getStats(): Promise<{
        counts: {
            users: number;
            books: number;
            authors: number;
            categories: number;
            borrowedBooks: number;
            overdueBooks: number;
        };
        fines: {
            collected: any;
            pending: any;
            waived: any;
            total: any;
        };
        recentBorrowings: (import("mongoose").Document<unknown, {}, BorrowingDocument, {}, import("mongoose").DefaultSchemaOptions> & Borrowing & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        mostBorrowedBooks: {
            book: (import("mongoose").Document<unknown, {}, BookDocument, {}, import("mongoose").DefaultSchemaOptions> & Book & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            } & {
                id: string;
            }) | null;
            borrowCount: any;
        }[];
    }>;
}
