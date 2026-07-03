import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { BorrowingsService } from '../borrowings/borrowings.service';
import { FineDocument } from './schemas/fine.schema';
export declare class FinesService {
    private fineModel;
    private borrowingsService;
    private configService;
    private fineRate;
    constructor(fineModel: Model<FineDocument>, borrowingsService: BorrowingsService, configService: ConfigService);
    generateFines(): Promise<{
        count: number;
        totalAmount: number;
    }>;
    findAll(): Promise<FineDocument[]>;
    findByUserId(userId: string): Promise<FineDocument[]>;
    markAsPaid(id: string): Promise<FineDocument>;
    waiveFine(id: string): Promise<FineDocument>;
    sumTotalFines(): Promise<{
        total: number;
        unpaid: number;
        paid: number;
        waived: number;
    }>;
}
