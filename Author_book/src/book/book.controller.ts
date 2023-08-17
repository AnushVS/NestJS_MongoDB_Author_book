import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Res() res: Response) {
    try {
      const book = await this.bookService.create(createBookDto);
      return res.status(HttpStatus.CREATED).json({ book });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const books = await this.bookService.findAll();
      res.status(HttpStatus.OK).json({ books });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const book = await this.bookService.findOne(id);
      res.status(HttpStatus.OK).json({ book });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Res() res: Response,
  ) {
    try {
      const message = await this.bookService.update(id, updateBookDto);
      res.status(HttpStatus.OK).json({ message });
    } catch (error) {
      res.status(HttpStatus.NOT_MODIFIED).json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedBook = await this.bookService.remove(id);
      res.status(HttpStatus.OK).json({ deletedBook });
    } catch (error) {
      res.status(HttpStatus.NOT_MODIFIED).json({ message: error.message });
    }
  }

  @Get('getBookByAuthorId/:id')
  async getBooksByAuthorId(@Param('id') id: string, @Res() res: Response) {
    try {
      const books = await this.bookService.getBooksByAuthorId(id);
      res.status(HttpStatus.OK).json({ books });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }
}
