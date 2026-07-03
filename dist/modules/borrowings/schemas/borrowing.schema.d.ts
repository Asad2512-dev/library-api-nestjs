import { Document, Types } from 'mongoose';
import { BorrowingStatus } from '../../../common/constants';
export type BorrowingDocument = Borrowing & Document;
export declare class Borrowing {
    user: Types.ObjectId;
    book: Types.ObjectId;
    borrowDate: Date;
    dueDate: Date;
    returnDate?: Date;
    status: BorrowingStatus;
}
export declare const BorrowingSchema: import("mongoose").Schema<Borrowing, import("mongoose").Model<Borrowing, any, any, any, any, any, Borrowing>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Borrowing, Document<unknown, {}, Borrowing, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Borrowing & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    user?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Borrowing, Document<unknown, {}, Borrowing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Borrowing & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    book?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Borrowing, Document<unknown, {}, Borrowing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Borrowing & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    borrowDate?: import("mongoose").SchemaDefinitionProperty<Date, Borrowing, Document<unknown, {}, Borrowing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Borrowing & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    dueDate?: import("mongoose").SchemaDefinitionProperty<Date, Borrowing, Document<unknown, {}, Borrowing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Borrowing & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    returnDate?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Borrowing, Document<unknown, {}, Borrowing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Borrowing & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<BorrowingStatus, Borrowing, Document<unknown, {}, Borrowing, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Borrowing & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Borrowing>;
