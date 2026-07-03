import { BookStatus } from '../../../common/constants';
import { PaginationQueryDto } from '../../../common/dto/pagination.dto';
export declare class BooksQueryDto extends PaginationQueryDto {
    category?: string;
    author?: string;
    status?: BookStatus;
}
