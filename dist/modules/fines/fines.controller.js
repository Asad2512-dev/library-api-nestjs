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
exports.FinesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fines_service_1 = require("./fines.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const constants_1 = require("../../common/constants");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let FinesController = class FinesController {
    finesService;
    constructor(finesService) {
        this.finesService = finesService;
    }
    async generateFines() {
        return this.finesService.generateFines();
    }
    async findAll() {
        return this.finesService.findAll();
    }
    async findMyFines(userId) {
        return this.finesService.findByUserId(userId);
    }
    async payFine(id) {
        return this.finesService.markAsPaid(id);
    }
    async waiveFine(id) {
        return this.finesService.waiveFine(id);
    }
};
exports.FinesController = FinesController;
__decorate([
    (0, common_1.Post)('generate'),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.LIBRARIAN, constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Scan overdue borrowings and generate/update outstanding fines (Librarian/Admin)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Fines successfully scanned and generated.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinesController.prototype, "generateFines", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.LIBRARIAN, constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all fines (Librarian/Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return list of all fines.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.MEMBER, constants_1.UserRole.LIBRARIAN, constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user fines' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return list of user fines.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FinesController.prototype, "findMyFines", null);
__decorate([
    (0, common_1.Post)(':id/pay'),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.LIBRARIAN, constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a fine as paid (Librarian/Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Fine paid successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Fine already processed.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Fine not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FinesController.prototype, "payFine", null);
__decorate([
    (0, common_1.Post)(':id/waive'),
    (0, roles_decorator_1.Roles)(constants_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Waive a fine (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Fine waived successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Fine already processed.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Fine not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FinesController.prototype, "waiveFine", null);
exports.FinesController = FinesController = __decorate([
    (0, swagger_1.ApiTags)('Fines'),
    (0, common_1.Controller)('fines'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [fines_service_1.FinesService])
], FinesController);
//# sourceMappingURL=fines.controller.js.map