import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Book, BookSchema } from '../books/schemas/book.schema';
import { Author, AuthorSchema } from '../authors/schemas/author.schema';
import {
  Category,
  CategorySchema,
} from '../categories/schemas/category.schema';
import {
  Borrowing,
  BorrowingSchema,
} from '../borrowings/schemas/borrowing.schema';
import { Fine, FineSchema } from '../fines/schemas/fine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Borrowing.name, schema: BorrowingSchema },
      { name: Fine.name, schema: FineSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
