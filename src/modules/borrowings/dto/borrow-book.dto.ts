import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class BorrowBookDto {
  @ApiProperty({
    example: '60d5ec49f3e46c3b64bc75b6',
    description: 'Mongoose ObjectId of the Book',
  })
  @IsMongoId()
  @IsNotEmpty()
  bookId: string;

  @ApiPropertyOptional({
    example: '2026-07-17T03:41:58Z',
    description:
      'Due date for returning the book. Defaults to 14 days from today.',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
