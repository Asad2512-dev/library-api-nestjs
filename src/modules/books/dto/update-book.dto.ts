import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { BookStatus } from '../../../common/constants';

export class UpdateBookDto {
  @ApiPropertyOptional({ example: '1984 (Special Edition)' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: '9780451524935' })
  @IsOptional()
  @IsString()
  isbn?: string;

  @ApiPropertyOptional({ example: 'Updated description...' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/covers/1984-new.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiPropertyOptional({ example: '60d5ec49f3e46c3b64bc75b4' })
  @IsOptional()
  @IsMongoId()
  author?: string;

  @ApiPropertyOptional({ example: '60d5ec49f3e46c3b64bc75b5' })
  @IsOptional()
  @IsMongoId()
  category?: string;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalCopies?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  availableCopies?: number;

  @ApiPropertyOptional({ example: 'English' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 'Penguin Books' })
  @IsOptional()
  @IsString()
  publisher?: string;

  @ApiPropertyOptional({ example: 1950 })
  @IsOptional()
  @IsInt()
  publishedYear?: number;

  @ApiPropertyOptional({ example: 'Shelf A-5' })
  @IsOptional()
  @IsString()
  shelfLocation?: string;

  @ApiPropertyOptional({ example: ['dystopian', 'classic', 'political'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ enum: BookStatus })
  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;
}
