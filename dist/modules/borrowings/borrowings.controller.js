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
exports.BorrowingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const borrowings_service_1 = require("./borrowings.service");
const borrow_book_dto_1 = require("./dto/borrow-book.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const constants_1 = require("../../common/constants");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let BorrowingsController = class BorrowingsController {
    borrowingsService;
    constructor(borrowingsService) {
        this.borrowingsService = borrowingsService;
    }
    async borrowBook(userId, borrowBookDto) {
        return this.borrowingsService.borrowBook(userId, borrowBookDto);
    }
    async returnBook(id) {
        return this.borrowingsService.returnBook(id);
    }
    async findAll() {
        return this.borrowingsService.findAll();
    }
    async findMyBorrowings(userId) {
        return this.borrowingsService.findByUserId(userId);
    }
    async findOverdue() {
        return this.borrowingsService.findOverdue();
    }
};
exports.BorrowingsController = BorrowingsController;
__decorate([
    (0, common_1.Post)('borrow'),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.MEMBER, constants_1.UserRole.LIBRARIAN, constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Borrow a book (Member/Librarian/Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Book borrowed successfully.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Book is unavailable or invalid due date.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Duplicate active borrowing for same book.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, borrow_book_dto_1.BorrowBookDto]),
    __metadata("design:returntype", Promise)
], BorrowingsController.prototype, "borrowBook", null);
__decorate([
    (0, common_1.Post)('return/:id'),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.LIBRARIAN, constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Return a borrowed book (Librarian/Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Book returned successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Borrowing record not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowingsController.prototype, "returnBook", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.LIBRARIAN, constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all borrowings (Librarian/Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return list of all borrowings.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BorrowingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.MEMBER, constants_1.UserRole.LIBRARIAN, constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user borrowings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return current user borrowings.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowingsController.prototype, "findMyBorrowings", null);
__decorate([
    (0, common_1.Get)('overdue'),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.LIBRARIAN, constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get overdue borrowings (Librarian/Admin)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return list of overdue borrowings.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BorrowingsController.prototype, "findOverdue", null);
exports.BorrowingsController = BorrowingsController = __decorate([
    (0, swagger_1.ApiTags)('Borrowings'),
    (0, common_1.Controller)('borrowings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [borrowings_service_1.BorrowingsService])
], BorrowingsController);
//# sourceMappingURL=borrowings.controller.js.map