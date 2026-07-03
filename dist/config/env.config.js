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
exports.validate = validate;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Test"] = "test";
    Environment["Provision"] = "provision";
})(Environment || (Environment = {}));
class EnvironmentVariables {
    NODE_ENV = Environment.Development;
    PORT = 3000;
    MONGODB_URI;
    JWT_SECRET;
    JWT_EXPIRATION = '1d';
    FINE_RATE_PER_DAY = 1.5;
    THROTTLER_TTL = 60000;
    THROTTLER_LIMIT = 100;
}
__decorate([
    (0, class_validator_1.IsEnum)(Environment),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "MONGODB_URI", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_EXPIRATION", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "FINE_RATE_PER_DAY", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "THROTTLER_TTL", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "THROTTLER_LIMIT", void 0);
function validate(config) {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(EnvironmentVariables, {
        ...config,
        PORT: config.PORT ? parseInt(config.PORT, 10) : undefined,
        FINE_RATE_PER_DAY: config.FINE_RATE_PER_DAY
            ? parseFloat(config.FINE_RATE_PER_DAY)
            : undefined,
        THROTTLER_TTL: config.THROTTLER_TTL
            ? parseInt(config.THROTTLER_TTL, 10)
            : undefined,
        THROTTLER_LIMIT: config.THROTTLER_LIMIT
            ? parseInt(config.THROTTLER_LIMIT, 10)
            : undefined,
    }, { enableImplicitConversion: true });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
//# sourceMappingURL=env.config.js.map