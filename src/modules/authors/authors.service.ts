import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './schemas/author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorDocument> {
    const author = new this.authorModel(createAuthorDto);
    return author.save();
  }

  async findAll(): Promise<AuthorDocument[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<AuthorDocument> {
    const author = await this.authorModel.findById(id).exec();
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorDocument> {
    const updated = await this.authorModel
      .findByIdAndUpdate(id, updateAuthorDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.authorModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return { message: 'Author successfully deleted' };
  }

  async countAll(): Promise<number> {
    return this.authorModel.countDocuments().exec();
  }
}
