import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { BorrowingsService } from '../borrowings/borrowings.service';
import { FineStatus, BorrowingStatus } from '../../common/constants';
import { Fine, FineDocument } from './schemas/fine.schema';

@Injectable()
export class FinesService {
  private fineRate: number;

  constructor(
    @InjectModel(Fine.name) private fineModel: Model<FineDocument>,
    private borrowingsService: BorrowingsService,
    private configService: ConfigService,
  ) {
    this.fineRate = this.configService.get<number>('FINE_RATE_PER_DAY') || 1.5;
  }

  async generateFines(): Promise<{ count: number; totalAmount: number }> {
    // Make sure we update statuses first
    await this.borrowingsService.updateOverdueStatuses();

    // Find all borrowings that are either returned overdue or currently overdue
    const allBorrowings = await this.borrowingsService.findAll();
    const overdueBorrowings = allBorrowings.filter((b) => {
      if (b.status === BorrowingStatus.OVERDUE) return true;
      if (
        b.status === BorrowingStatus.RETURNED &&
        b.returnDate &&
        b.returnDate > b.dueDate
      )
        return true;
      return false;
    });

    let count = 0;
    let totalAmount = 0;

    for (const borrowing of overdueBorrowings) {
      const endTimestamp = borrowing.returnDate
        ? borrowing.returnDate.getTime()
        : Date.now();
      const diffMs = endTimestamp - borrowing.dueDate.getTime();

      if (diffMs <= 0) continue;

      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const calculatedAmount = diffDays * this.fineRate;

      // Check if fine record already exists for this borrowing
      const existingFine = await this.fineModel.findOne({
        borrowing: borrowing._id,
      });

      if (existingFine) {
        // If unpaid, update the amount if it has increased
        if (
          existingFine.status === FineStatus.UNPAID &&
          existingFine.amount !== calculatedAmount
        ) {
          existingFine.amount = calculatedAmount;
          existingFine.reason = `Overdue by ${diffDays} days (Rate: ${this.fineRate}/day)`;
          await existingFine.save();
          totalAmount += calculatedAmount;
          count++;
        }
      } else {
        // Create new fine
        const fine = new this.fineModel({
          user: borrowing.user._id,
          borrowing: borrowing._id,
          amount: calculatedAmount,
          reason: `Overdue by ${diffDays} days (Rate: ${this.fineRate}/day)`,
          status: FineStatus.UNPAID,
        });
        await fine.save();
        totalAmount += calculatedAmount;
        count++;
      }
    }

    return { count, totalAmount };
  }

  async findAll(): Promise<FineDocument[]> {
    return this.fineModel.find().populate(['user', 'borrowing']).exec();
  }

  async findByUserId(userId: string): Promise<FineDocument[]> {
    return this.fineModel
      .find({ user: new Types.ObjectId(userId) })
      .populate(['user', 'borrowing'])
      .exec();
  }

  async markAsPaid(id: string): Promise<FineDocument> {
    const fine = await this.fineModel.findById(id).exec();
    if (!fine) {
      throw new NotFoundException(`Fine record with ID ${id} not found`);
    }
    if (fine.status !== FineStatus.UNPAID) {
      throw new BadRequestException(`Fine is already ${fine.status}`);
    }

    fine.status = FineStatus.PAID;
    return (await fine.save()).populate(['user', 'borrowing']);
  }

  async waiveFine(id: string): Promise<FineDocument> {
    const fine = await this.fineModel.findById(id).exec();
    if (!fine) {
      throw new NotFoundException(`Fine record with ID ${id} not found`);
    }
    if (fine.status !== FineStatus.UNPAID) {
      throw new BadRequestException(`Fine is already ${fine.status}`);
    }

    fine.status = FineStatus.WAIVED;
    return (await fine.save()).populate(['user', 'borrowing']);
  }

  async sumTotalFines(): Promise<{
    total: number;
    unpaid: number;
    paid: number;
    waived: number;
  }> {
    const result = await this.fineModel.aggregate([
      {
        $group: {
          _id: '$status',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const stats = {
      total: 0,
      unpaid: 0,
      paid: 0,
      waived: 0,
    };

    result.forEach((group) => {
      const status = group._id;
      const amount = group.totalAmount;
      if (status === FineStatus.PAID) stats.paid = amount;
      if (status === FineStatus.UNPAID) stats.unpaid = amount;
      if (status === FineStatus.WAIVED) stats.waived = amount;
    });

    stats.total = stats.paid + stats.unpaid + stats.waived;
    return stats;
  }
}
