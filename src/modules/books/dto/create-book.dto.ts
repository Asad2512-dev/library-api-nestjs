import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { BookStatus } from '../../../common/constants';

export class CreateBookDto {
  @ApiProperty({ example: '1984' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '9780451524935' })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiPropertyOptional({
    example: 'A dystopian social science fiction novel...',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/covers/1984.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiProperty({
    example: '60d5ec49f3e46c3b64bc75b4',
    description: 'Mongoose ObjectId of the Author',
  })
  @IsMongoId()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: '60d5ec49f3e46c3b64bc75b5',
    description: 'Mongoose ObjectId of the Category',
  })
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  totalCopies: number;

  @ApiPropertyOptional({ example: 'English' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 'Secker & Warburg' })
  @IsOptional()
  @IsString()
  publisher?: string;

  @ApiPropertyOptional({ example: 1949 })
  @IsOptional()
  @IsInt()
  publishedYear?: number;

  @ApiPropertyOptional({ example: 'Shelf A-4' })
  @IsOptional()
  @IsString()
  shelfLocation?: string;

  @ApiPropertyOptional({ example: ['dystopian', 'classic'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ enum: BookStatus, default: BookStatus.AVAILABLE })
  @IsOptional()
  @IsEnum(BookStatus)
  status?: BookStatus;
}
