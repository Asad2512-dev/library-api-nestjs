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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const slugify_1 = require("../../common/utils/slugify");
const category_schema_1 = require("./schemas/category.schema");
let CategoriesService = class CategoriesService {
    categoryModel;
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async create(createCategoryDto) {
        const slug = (0, slugify_1.slugify)(createCategoryDto.name);
        const existing = await this.categoryModel.findOne({ slug });
        if (existing) {
            throw new common_1.ConflictException('Category with this name already exists');
        }
        const category = new this.categoryModel({
            ...createCategoryDto,
            slug,
        });
        return category.save();
    }
    async findAll() {
        return this.categoryModel.find().exec();
    }
    async findOne(id) {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const updates = { ...updateCategoryDto };
        if (updateCategoryDto.name) {
            updates.slug = (0, slugify_1.slugify)(updateCategoryDto.name);
            const existing = await this.categoryModel.findOne({
                slug: updates.slug,
                _id: { $ne: id },
            });
            if (existing) {
                throw new common_1.ConflictException('Category with this name already exists');
            }
        }
        const updated = await this.categoryModel
            .findByIdAndUpdate(id, updates, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return updated;
    }
    async delete(id) {
        const deleted = await this.categoryModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        return { message: 'Category successfully deleted' };
    }
    async countAll() {
        return this.categoryModel.countDocuments().exec();
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map