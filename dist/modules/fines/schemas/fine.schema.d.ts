import { Document, Types } from 'mongoose';
import { FineStatus } from '../../../common/constants';
export type FineDocument = Fine & Document;
export declare class Fine {
    user: Types.ObjectId;
    borrowing: Types.ObjectId;
    amount: number;
    reason: string;
    status: FineStatus;
}
export declare const FineSchema: import("mongoose").Schema<Fine, import("mongoose").Model<Fine, any, any, any, any, any, Fine>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Fine, Document<unknown, {}, Fine, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Fine & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    user?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Fine, Document<unknown, {}, Fine, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Fine & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    borrowing?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Fine, Document<unknown, {}, Fine, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Fine & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    amount?: import("mongoose").SchemaDefinitionProperty<number, Fine, Document<unknown, {}, Fine, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Fine & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reason?: import("mongoose").SchemaDefinitionProperty<string, Fine, Document<unknown, {}, Fine, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Fine & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<FineStatus, Fine, Document<unknown, {}, Fine, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Fine & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Fine>;
