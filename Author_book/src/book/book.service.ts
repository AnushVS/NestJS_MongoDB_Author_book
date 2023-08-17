import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from 'src/author/entities/author.entity';
import { Model } from 'mongoose';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<Author>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}
  async create(createBookDto: CreateBookDto) {
    try {
      const author = await this.authorModel.findById(createBookDto.author);
      if (author) {
        const book = new this.bookModel(createBookDto);
        await book.save();
        await this.authorModel.findByIdAndUpdate(author._id, {
          books: [...author.books, book._id],
        });
        return 'Book created';
      }
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async findAll() {
    try {
      return await this.bookModel.find();
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async findOne(id: string) {
    try {
      return await this.bookModel.findById(id);
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const book = await this.bookModel.findById(id);
      if (!book) {
        throw new NotFoundException(id + ' not found');
      }
      await this.bookModel.findByIdAndUpdate(id, updateBookDto);
      return "Book's data updated";
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
  async remove(id: string) {
    try {
      const book = await this.bookModel.findById(id);
      if (!book) {
        throw new NotFoundException(id + ' not found');
      }
      const author = await this.authorModel.findById(book.author);
      if (author) {
        let updateBooks = author.books.filter((b: any) => b._id != id);
        await this.authorModel.findByIdAndUpdate(author._id, {
          books: [...updateBooks],
        });

        return this.bookModel.findByIdAndDelete(id);
      } else {
        throw new NotFoundException(book.author + ' not found');
      }
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
  async getBooksByAuthorId(id: string) {
    try {
      const author = await this.authorModel.findById(id);
      if (!author) {
        return 'Author not found';
      }
      const books = await this.bookModel.find({
        author: author._id,
      });
      return books;
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
}
