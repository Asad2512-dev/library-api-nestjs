import { Model, Types } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksQueryDto } from './dto/books-query.dto';
export declare class BooksService {
    private bookModel;
    constructor(bookModel: Model<BookDocument>);
    create(createBookDto: CreateBookDto): Promise<BookDocument>;
    findAll(queryDto: BooksQueryDto): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, BookDocument, {}, import("mongoose").DefaultSchemaOptions> & Book & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
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
    findOne(id: string): Promise<BookDocument>;
    findBySlug(slug: string): Promise<BookDocument>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<BookDocument>;
    delete(id: string): Promise<{
        message: string;
    }>;
    adjustAvailableCopies(id: string, amount: number): Promise<BookDocument>;
    countAll(): Promise<number>;
}
