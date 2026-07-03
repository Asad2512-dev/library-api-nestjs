import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BorrowingStatus } from '../../../common/constants';

export type BorrowingDocument = Borrowing & Document;

@Schema({ timestamps: true })
export class Borrowing {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true, index: true })
  book: Types.ObjectId;

  @Prop({ required: true, type: Date, default: Date.now })
  borrowDate: Date;

  @Prop({ required: true, type: Date })
  dueDate: Date;

  @Prop({ type: Date })
  returnDate?: Date;

  @Prop({
    type: String,
    enum: BorrowingStatus,
    default: BorrowingStatus.BORROWED,
    index: true,
  })
  status: BorrowingStatus;
}

export const BorrowingSchema = SchemaFactory.createForClass(Borrowing);
