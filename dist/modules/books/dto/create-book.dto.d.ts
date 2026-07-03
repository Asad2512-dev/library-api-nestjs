import { BookStatus } from '../../../common/constants';
export declare class CreateBookDto {
    title: string;
    isbn: string;
    description?: string;
    coverImage?: string;
    author: string;
    category: string;
    totalCopies: number;
    language?: string;
    publisher?: string;
    publishedYear?: number;
    shelfLocation?: string;
    tags?: string[];
    status?: BookStatus;
}
