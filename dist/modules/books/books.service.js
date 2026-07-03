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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const slugify_1 = require("../../common/utils/slugify");
const book_schema_1 = require("./schemas/book.schema");
let BooksService = class BooksService {
    bookModel;
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async create(createBookDto) {
        const slug = (0, slugify_1.slugify)(createBookDto.title);
        const existingSlug = await this.bookModel.findOne({ slug });
        if (existingSlug) {
            throw new common_1.ConflictException('Book with this title already exists (duplicate slug)');
        }
        const existingIsbn = await this.bookModel.findOne({
            isbn: createBookDto.isbn,
        });
        if (existingIsbn) {
            throw new common_1.ConflictException('Book with this ISBN already exists');
        }
        const book = new this.bookModel({
            ...createBookDto,
            slug,
            availableCopies: createBookDto.totalCopies,
        });
        return book.save();
    }
    async findAll(queryDto) {
        const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc', category, author, status, } = queryDto;
        const filter = {};
        if (category) {
            filter.category = new mongoose_2.Types.ObjectId(category);
        }
        if (author) {
            filter.author = new mongoose_2.Types.ObjectId(author);
        }
        if (status) {
            filter.status = status;
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { isbn: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } },
            ];
        }
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.bookModel
                .find(filter)
                .populate('author')
                .populate('category')
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec(),
            this.bookModel.countDocuments(filter).exec(),
        ]);
        return {
            success: true,
            data: items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const book = await this.bookModel
            .findById(id)
            .populate('author')
            .populate('category')
            .exec();
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    async findBySlug(slug) {
        const book = await this.bookModel
            .findOne({ slug })
            .populate('author')
            .populate('category')
            .exec();
        if (!book) {
            throw new common_1.NotFoundException(`Book with slug ${slug} not found`);
        }
        return book;
    }
    async update(id, updateBookDto) {
        const book = await this.findOne(id);
        const updates = { ...updateBookDto };
        if (updateBookDto.title) {
            updates.slug = (0, slugify_1.slugify)(updateBookDto.title);
            const existing = await this.bookModel.findOne({
                slug: updates.slug,
                _id: { $ne: id },
            });
            if (existing) {
                throw new common_1.ConflictException('Book with this title already exists');
            }
        }
        if (updateBookDto.isbn) {
            const existing = await this.bookModel.findOne({
                isbn: updateBookDto.isbn,
                _id: { $ne: id },
            });
            if (existing) {
                throw new common_1.ConflictException('Book with this ISBN already exists');
            }
        }
        if (updateBookDto.totalCopies !== undefined) {
            const diff = updateBookDto.totalCopies - book.totalCopies;
            const newAvailable = book.availableCopies + diff;
            if (newAvailable < 0) {
                throw new common_1.ConflictException('Cannot reduce total copies below currently borrowed copies');
            }
            updates.availableCopies = newAvailable;
        }
        const updated = await this.bookModel
            .findByIdAndUpdate(id, updates, { new: true })
            .populate('author')
            .populate('category')
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return updated;
    }
    async delete(id) {
        const deleted = await this.bookModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return { message: 'Book successfully deleted' };
    }
    async adjustAvailableCopies(id, amount) {
        const updated = await this.bookModel
            .findByIdAndUpdate(id, { $inc: { availableCopies: amount } }, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return updated;
    }
    async countAll() {
        return this.bookModel.countDocuments().exec();
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BooksService);
//# sourceMappingURL=books.service.js.map