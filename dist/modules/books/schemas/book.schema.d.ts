import { Document, Types } from 'mongoose';
import { BookStatus } from '../../../common/constants';
export type BookDocument = Book & Document;
export declare class Book {
    title: string;
    slug: string;
    isbn: string;
    description: string;
    coverImage: string;
    author: Types.ObjectId;
    category: Types.ObjectId;
    totalCopies: number;
    availableCopies: number;
    language: string;
    publisher: string;
    publishedYear: number;
    shelfLocation: string;
    tags: string[];
    status: BookStatus;
}
export declare const BookSchema: import("mongoose").Schema<Book, import("mongoose").Model<Book, any, any, any, any, any, Book>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Book, Document<unknown, {}, Book, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slug?: import("mongoose").SchemaDefinitionProperty<string, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isbn?: import("mongoose").SchemaDefinitionProperty<string, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    coverImage?: import("mongoose").SchemaDefinitionProperty<string, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    author?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalCopies?: import("mongoose").SchemaDefinitionProperty<number, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    availableCopies?: import("mongoose").SchemaDefinitionProperty<number, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    language?: import("mongoose").SchemaDefinitionProperty<string, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    publisher?: import("mongoose").SchemaDefinitionProperty<string, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    publishedYear?: import("mongoose").SchemaDefinitionProperty<number, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    shelfLocation?: import("mongoose").SchemaDefinitionProperty<string, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string[], Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<BookStatus, Book, Document<unknown, {}, Book, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Book & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Book>;
