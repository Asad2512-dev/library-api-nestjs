import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { slugify } from '../../common/utils/slugify';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    const slug = slugify(createCategoryDto.name);
    const existing = await this.categoryModel.findOne({ slug });
    if (existing) {
      throw new ConflictException('Category with this name already exists');
    }

    const category = new this.categoryModel({
      ...createCategoryDto,
      slug,
    });
    return category.save();
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    const updates: Partial<Category> = { ...updateCategoryDto };
    if (updateCategoryDto.name) {
      updates.slug = slugify(updateCategoryDto.name);

      // Check if slug already exists in another category
      const existing = await this.categoryModel.findOne({
        slug: updates.slug,
        _id: { $ne: id },
      });
      if (existing) {
        throw new ConflictException('Category with this name already exists');
      }
    }

    const updated = await this.categoryModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return { message: 'Category successfully deleted' };
  }

  async countAll(): Promise<number> {
    return this.categoryModel.countDocuments().exec();
  }
}
