import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FineStatus } from '../../../common/constants';

export type FineDocument = Fine & Document;

@Schema({ timestamps: true })
export class Fine {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Borrowing', required: true, index: true })
  borrowing: Types.ObjectId;

  @Prop({ required: true, type: Number })
  amount: number;

  @Prop()
  reason: string;

  @Prop({
    type: String,
    enum: FineStatus,
    default: FineStatus.UNPAID,
    index: true,
  })
  status: FineStatus;
}

export const FineSchema = SchemaFactory.createForClass(Fine);
