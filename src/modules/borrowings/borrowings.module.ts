import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowingsService } from './borrowings.service';
import { BorrowingsController } from './borrowings.controller';
import { Borrowing, BorrowingSchema } from './schemas/borrowing.schema';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Borrowing.name, schema: BorrowingSchema },
    ]),
    BooksModule,
  ],
  controllers: [BorrowingsController],
  providers: [BorrowingsService],
  exports: [BorrowingsService],
})
export class BorrowingsModule {}
