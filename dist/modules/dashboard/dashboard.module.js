"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_controller_1 = require("./dashboard.controller");
const user_schema_1 = require("../users/schemas/user.schema");
const book_schema_1 = require("../books/schemas/book.schema");
const author_schema_1 = require("../authors/schemas/author.schema");
const category_schema_1 = require("../categories/schemas/category.schema");
const borrowing_schema_1 = require("../borrowings/schemas/borrowing.schema");
const fine_schema_1 = require("../fines/schemas/fine.schema");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: book_schema_1.Book.name, schema: book_schema_1.BookSchema },
                { name: author_schema_1.Author.name, schema: author_schema_1.AuthorSchema },
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: borrowing_schema_1.Borrowing.name, schema: borrowing_schema_1.BorrowingSchema },
                { name: fine_schema_1.Fine.name, schema: fine_schema_1.FineSchema },
            ]),
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map