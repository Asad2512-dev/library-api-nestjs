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
exports.BorrowingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const books_service_1 = require("../books/books.service");
const constants_1 = require("../../common/constants");
const borrowing_schema_1 = require("./schemas/borrowing.schema");
let BorrowingsService = class BorrowingsService {
    borrowingModel;
    booksService;
    constructor(borrowingModel, booksService) {
        this.borrowingModel = borrowingModel;
        this.booksService = booksService;
    }
    async borrowBook(userId, borrowDto) {
        const book = await this.booksService.findOne(borrowDto.bookId);
        if (book.status !== constants_1.BookStatus.AVAILABLE || book.availableCopies <= 0) {
            throw new common_1.BadRequestException('Book is currently unavailable or out of stock');
        }
        const activeBorrowing = await this.borrowingModel.findOne({
            user: new mongoose_2.Types.ObjectId(userId),
            book: book._id,
            status: { $in: [constants_1.BorrowingStatus.BORROWED, constants_1.BorrowingStatus.OVERDUE] },
        });
        if (activeBorrowing) {
            throw new common_1.ConflictException('You have already borrowed this book and not returned it yet');
        }
        const borrowDate = new Date();
        const dueDate = borrowDto.dueDate
            ? new Date(borrowDto.dueDate)
            : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        if (dueDate <= borrowDate) {
            throw new common_1.BadRequestException('Due date must be in the future');
        }
        await this.booksService.adjustAvailableCopies(book._id.toString(), -1);
        const borrowing = new this.borrowingModel({
            user: new mongoose_2.Types.ObjectId(userId),
            book: book._id,
            borrowDate,
            dueDate,
            status: constants_1.BorrowingStatus.BORROWED,
        });
        return borrowing.save();
    }
    async returnBook(id) {
        const borrowing = await this.borrowingModel.findById(id).exec();
        if (!borrowing) {
            throw new common_1.NotFoundException(`Borrowing record with ID ${id} not found`);
        }
        if (borrowing.status === constants_1.BorrowingStatus.RETURNED) {
            throw new common_1.BadRequestException('This book has already been returned');
        }
        borrowing.returnDate = new Date();
        borrowing.status = constants_1.BorrowingStatus.RETURNED;
        await borrowing.save();
        await this.booksService.adjustAvailableCopies(borrowing.book.toString(), 1);
        return borrowing.populate(['user', 'book']);
    }
    async findAll() {
        await this.updateOverdueStatuses();
        return this.borrowingModel.find().populate(['user', 'book']).exec();
    }
    async findByUserId(userId) {
        await this.updateOverdueStatuses();
        return this.borrowingModel
            .find({ user: new mongoose_2.Types.ObjectId(userId) })
            .populate(['user', 'book'])
            .exec();
    }
    async findOverdue() {
        await this.updateOverdueStatuses();
        return this.borrowingModel
            .find({ status: constants_1.BorrowingStatus.OVERDUE })
            .populate(['user', 'book'])
            .exec();
    }
    async findById(id) {
        return this.borrowingModel.findById(id).populate(['user', 'book']).exec();
    }
    async updateOverdueStatuses() {
        const now = new Date();
        await this.borrowingModel.updateMany({
            status: constants_1.BorrowingStatus.BORROWED,
            dueDate: { $lt: now },
        }, {
            $set: { status: constants_1.BorrowingStatus.OVERDUE },
        });
    }
    async countAll() {
        return this.borrowingModel.countDocuments().exec();
    }
    async countBorrowed() {
        return this.borrowingModel
            .countDocuments({
            status: { $in: [constants_1.BorrowingStatus.BORROWED, constants_1.BorrowingStatus.OVERDUE] },
        })
            .exec();
    }
    async countOverdue() {
        await this.updateOverdueStatuses();
        return this.borrowingModel
            .countDocuments({ status: constants_1.BorrowingStatus.OVERDUE })
            .exec();
    }
};
exports.BorrowingsService = BorrowingsService;
exports.BorrowingsService = BorrowingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(borrowing_schema_1.Borrowing.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        books_service_1.BooksService])
], BorrowingsService);
//# sourceMappingURL=borrowings.service.js.map