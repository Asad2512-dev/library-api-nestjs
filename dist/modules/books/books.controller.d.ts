import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksQueryDto } from './dto/books-query.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<import("./schemas/book.schema").BookDocument>;
    findAll(query: BooksQueryDto): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("./schemas/book.schema").BookDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/book.schema").Book & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("./schemas/book.schema").BookDocument>;
    findBySlug(slug: string): Promise<import("./schemas/book.schema").BookDocument>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<import("./schemas/book.schema").BookDocument>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
