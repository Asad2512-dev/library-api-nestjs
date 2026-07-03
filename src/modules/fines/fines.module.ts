import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FinesService } from './fines.service';
import { FinesController } from './fines.controller';
import { Fine, FineSchema } from './schemas/fine.schema';
import { BorrowingsModule } from '../borrowings/borrowings.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fine.name, schema: FineSchema }]),
    BorrowingsModule,
    ConfigModule,
  ],
  controllers: [FinesController],
  providers: [FinesService],
  exports: [FinesService],
})
export class FinesModule {}
