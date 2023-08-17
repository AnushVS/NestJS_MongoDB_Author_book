import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './entities/author.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}
  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const author = new this.authorModel(createAuthorDto);
      await author.save();
      return 'Author created';
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async findAll() {
    try {
      return await this.authorModel.find().populate('books').exec();
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async findOne(id: string) {
    try {
      return this.authorModel.findById(id).populate('books').exec();;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    try {
      const author = await this.authorModel.findById(id);
      if (!author) {
        throw new NotFoundException(id + ' not found');
      }
      await this.authorModel.findByIdAndUpdate(id, updateAuthorDto);
      return "Author's datas updated";
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async remove(id: string) {
    try {
      const author = await this.authorModel.findById(id);
      if (!author) {
        throw new NotFoundException(id + ' not found');
      }
      await this.authorModel.findByIdAndDelete(id);
      return 'Author deleted';
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
}

