import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { BookStatus } from '../../../common/constants';
import { PaginationQueryDto } from '../../../common/dto/pagination.dto';

export class BooksQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by Category ObjectId' })
  @IsOptional()
  @IsMongoId()
  category?: string;

  @ApiPropertyOptional({ description: 'Filter by Author ObjectId' })
  @IsOptional()
  @IsMongoId()
  author?: string;

  @ApiPropertyOptional({
    enum: BookStatus,
    description: 'Filter by Book Status',
  })
  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;
}
