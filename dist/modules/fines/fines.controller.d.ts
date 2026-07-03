import { FinesService } from './fines.service';
export declare class FinesController {
    private readonly finesService;
    constructor(finesService: FinesService);
    generateFines(): Promise<{
        count: number;
        totalAmount: number;
    }>;
    findAll(): Promise<import("./schemas/fine.schema").FineDocument[]>;
    findMyFines(userId: string): Promise<import("./schemas/fine.schema").FineDocument[]>;
    payFine(id: string): Promise<import("./schemas/fine.schema").FineDocument>;
    waiveFine(id: string): Promise<import("./schemas/fine.schema").FineDocument>;
}
