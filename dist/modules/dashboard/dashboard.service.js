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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const book_schema_1 = require("../books/schemas/book.schema");
const author_schema_1 = require("../authors/schemas/author.schema");
const category_schema_1 = require("../categories/schemas/category.schema");
const borrowing_schema_1 = require("../borrowings/schemas/borrowing.schema");
const fine_schema_1 = require("../fines/schemas/fine.schema");
const constants_1 = require("../../common/constants");
let DashboardService = class DashboardService {
    userModel;
    bookModel;
    authorModel;
    categoryModel;
    borrowingModel;
    fineModel;
    constructor(userModel, bookModel, authorModel, categoryModel, borrowingModel, fineModel) {
        this.userModel = userModel;
        this.bookModel = bookModel;
        this.authorModel = authorModel;
        this.categoryModel = categoryModel;
        this.borrowingModel = borrowingModel;
        this.fineModel = fineModel;
    }
    async getStats() {
        const [totalUsers, totalBooks, totalAuthors, totalCategories] = await Promise.all([
            this.userModel.countDocuments().exec(),
            this.bookModel.countDocuments().exec(),
            this.authorModel.countDocuments().exec(),
            this.categoryModel.countDocuments().exec(),
        ]);
        const [totalBorrowed, totalOverdue] = await Promise.all([
            this.borrowingModel
                .countDocuments({
                status: { $in: [constants_1.BorrowingStatus.BORROWED, constants_1.BorrowingStatus.OVERDUE] },
            })
                .exec(),
            this.borrowingModel
                .countDocuments({ status: constants_1.BorrowingStatus.OVERDUE })
                .exec(),
        ]);
        const finesAggregate = await this.fineModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalCollected: {
                        $sum: {
                            $cond: [{ $eq: ['$status', constants_1.FineStatus.PAID] }, '$amount', 0],
                        },
                    },
                    totalPending: {
                        $sum: {
                            $cond: [{ $eq: ['$status', constants_1.FineStatus.UNPAID] }, '$amount', 0],
                        },
                    },
                    totalWaived: {
                        $sum: {
                            $cond: [{ $eq: ['$status', constants_1.FineStatus.WAIVED] }, '$amount', 0],
                        },
                    },
                },
            },
        ]);
        const fineStats = finesAggregate[0] || {
            totalCollected: 0,
            totalPending: 0,
            totalWaived: 0,
        };
        const recentBorrowings = await this.borrowingModel
            .find()
            .populate(['user', 'book'])
            .sort({ createdAt: -1 })
            .limit(5)
            .exec();
        const mostBorrowedAggregate = await this.borrowingModel.aggregate([
            {
                $group: {
                    _id: '$book',
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);
        const mostBorrowedBooks = await Promise.all(mostBorrowedAggregate.map(async (item) => {
            const book = await this.bookModel
                .findById(item._id)
                .populate(['author', 'category'])
                .exec();
            return {
                book,
                borrowCount: item.count,
            };
        }));
        return {
            counts: {
                users: totalUsers,
                books: totalBooks,
                authors: totalAuthors,
                categories: totalCategories,
                borrowedBooks: totalBorrowed,
                overdueBooks: totalOverdue,
            },
            fines: {
                collected: fineStats.totalCollected,
                pending: fineStats.totalPending,
                waived: fineStats.totalWaived,
                total: fineStats.totalCollected +
                    fineStats.totalPending +
                    fineStats.totalWaived,
            },
            recentBorrowings,
            mostBorrowedBooks: mostBorrowedBooks.filter((b) => b.book !== null),
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __param(2, (0, mongoose_1.InjectModel)(author_schema_1.Author.name)),
    __param(3, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(4, (0, mongoose_1.InjectModel)(borrowing_schema_1.Borrowing.name)),
    __param(5, (0, mongoose_1.InjectModel)(fine_schema_1.Fine.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map