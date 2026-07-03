import { Document } from 'mongoose';
export type AuthorDocument = Author & Document;
export declare class Author {
    name: string;
    bio: string;
    image: string;
    nationality: string;
}
export declare const AuthorSchema: import("mongoose").Schema<Author, import("mongoose").Model<Author, any, any, any, any, any, Author>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Author, Document<unknown, {}, Author, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Author & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Author, Document<unknown, {}, Author, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Author & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    bio?: import("mongoose").SchemaDefinitionProperty<string, Author, Document<unknown, {}, Author, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Author & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    image?: import("mongoose").SchemaDefinitionProperty<string, Author, Document<unknown, {}, Author, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Author & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    nationality?: import("mongoose").SchemaDefinitionProperty<string, Author, Document<unknown, {}, Author, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Author & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Author>;
