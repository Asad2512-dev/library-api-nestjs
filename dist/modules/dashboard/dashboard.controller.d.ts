import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
        recentBorrowings: (import("mongoose").Document<unknown, {}, import("../borrowings/schemas/borrowing.schema").BorrowingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../borrowings/schemas/borrowing.schema").Borrowing & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        mostBorrowedBooks: {
            book: (import("mongoose").Document<unknown, {}, import("../books/schemas/book.schema").BookDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../books/schemas/book.schema").Book & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
