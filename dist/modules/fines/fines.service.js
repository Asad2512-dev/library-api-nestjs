"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const borrowings_service_1 = require("../borrowings/borrowings.service");
const constants_1 = require("../../common/constants");
const fine_schema_1 = require("./schemas/fine.schema");
let FinesService = class FinesService {
    fineModel;
    borrowingsService;
    configService;
    fineRate;
    constructor(fineModel, borrowingsService, configService) {
        this.fineModel = fineModel;
        this.borrowingsService = borrowingsService;
        this.configService = configService;
        this.fineRate = this.configService.get('FINE_RATE_PER_DAY') || 1.5;
    }
    async generateFines() {
        await this.borrowingsService.updateOverdueStatuses();
        const allBorrowings = await this.borrowingsService.findAll();
        const overdueBorrowings = allBorrowings.filter((b) => {
            if (b.status === constants_1.BorrowingStatus.OVERDUE)
                return true;
            if (b.status === constants_1.BorrowingStatus.RETURNED &&
                b.returnDate &&
                b.returnDate > b.dueDate)
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
            if (diffMs <= 0)
                continue;
            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            const calculatedAmount = diffDays * this.fineRate;
            const existingFine = await this.fineModel.findOne({
                borrowing: borrowing._id,
            });
            if (existingFine) {
                if (existingFine.status === constants_1.FineStatus.UNPAID &&
                    existingFine.amount !== calculatedAmount) {
                    existingFine.amount = calculatedAmount;
                    existingFine.reason = `Overdue by ${diffDays} days (Rate: ${this.fineRate}/day)`;
                    await existingFine.save();
                    totalAmount += calculatedAmount;
                    count++;
                }
            }
            else {
                const fine = new this.fineModel({
                    user: borrowing.user._id,
                    borrowing: borrowing._id,
                    amount: calculatedAmount,
                    reason: `Overdue by ${diffDays} days (Rate: ${this.fineRate}/day)`,
                    status: constants_1.FineStatus.UNPAID,
                });
                await fine.save();
                totalAmount += calculatedAmount;
                count++;
            }
        }
        return { count, totalAmount };
    }
    async findAll() {
        return this.fineModel.find().populate(['user', 'borrowing']).exec();
    }
    async findByUserId(userId) {
        return this.fineModel
            .find({ user: new mongoose_2.Types.ObjectId(userId) })
            .populate(['user', 'borrowing'])
            .exec();
    }
    async markAsPaid(id) {
        const fine = await this.fineModel.findById(id).exec();
        if (!fine) {
            throw new common_1.NotFoundException(`Fine record with ID ${id} not found`);
        }
        if (fine.status !== constants_1.FineStatus.UNPAID) {
            throw new common_1.BadRequestException(`Fine is already ${fine.status}`);
        }
        fine.status = constants_1.FineStatus.PAID;
        return (await fine.save()).populate(['user', 'borrowing']);
    }
    async waiveFine(id) {
        const fine = await this.fineModel.findById(id).exec();
        if (!fine) {
            throw new common_1.NotFoundException(`Fine record with ID ${id} not found`);
        }
        if (fine.status !== constants_1.FineStatus.UNPAID) {
            throw new common_1.BadRequestException(`Fine is already ${fine.status}`);
        }
        fine.status = constants_1.FineStatus.WAIVED;
        return (await fine.save()).populate(['user', 'borrowing']);
    }
    async sumTotalFines() {
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
            if (status === constants_1.FineStatus.PAID)
                stats.paid = amount;
            if (status === constants_1.FineStatus.UNPAID)
                stats.unpaid = amount;
            if (status === constants_1.FineStatus.WAIVED)
                stats.waived = amount;
        });
        stats.total = stats.paid + stats.unpaid + stats.waived;
        return stats;
    }
};
exports.FinesService = FinesService;
exports.FinesService = FinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(fine_schema_1.Fine.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        borrowings_service_1.BorrowingsService,
        config_1.ConfigService])
], FinesService);
//# sourceMappingURL=fines.service.js.map