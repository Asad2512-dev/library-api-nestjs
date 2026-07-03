import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BookStatus } from '../../../common/constants';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true, unique: true, index: true })
  isbn: string;

  @Prop()
  description: string;

  @Prop()
  coverImage: string;

  @Prop({ type: Types.ObjectId, ref: 'Author', required: true, index: true })
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true, index: true })
  category: Types.ObjectId;

  @Prop({ required: true, type: Number })
  totalCopies: number;

  @Prop({ required: true, type: Number })
  availableCopies: number;

  @Prop()
  language: string;

  @Prop()
  publisher: string;

  @Prop({ type: Number })
  publishedYear: number;

  @Prop()
  shelfLocation: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({
    type: String,
    enum: BookStatus,
    default: BookStatus.AVAILABLE,
    index: true,
  })
  status: BookStatus;
}

export const BookSchema = SchemaFactory.createForClass(Book);
