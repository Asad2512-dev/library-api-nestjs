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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FineSchema = exports.Fine = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../common/constants");
let Fine = class Fine {
    user;
    borrowing;
    amount;
    reason;
    status;
};
exports.Fine = Fine;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Fine.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Borrowing', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Fine.prototype, "borrowing", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], Fine.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Fine.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: constants_1.FineStatus,
        default: constants_1.FineStatus.UNPAID,
        index: true,
    }),
    __metadata("design:type", String)
], Fine.prototype, "status", void 0);
exports.Fine = Fine = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Fine);
exports.FineSchema = mongoose_1.SchemaFactory.createForClass(Fine);
//# sourceMappingURL=fine.schema.js.map