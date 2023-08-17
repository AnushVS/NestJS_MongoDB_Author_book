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
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto, @Res() res: Response) {
    try {
      const author = await this.authorService.create(createAuthorDto);
      res.status(HttpStatus.CREATED).json({ author });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const authors = await this.authorService.findAll();
      res.status(HttpStatus.OK).json({ authors });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const author = await this.authorService.findOne(id);
      res.status(HttpStatus.OK).json({ author });
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @Res() res: Response,
  ) {
    try {
      const updatedAuthor = await this.authorService.update(
        id,
        updateAuthorDto,
      );
      res.status(HttpStatus.OK).json({ updatedAuthor });
    } catch (error) {
      res.status(HttpStatus.NOT_MODIFIED).json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const message = await this.authorService.remove(id);
      res.status(HttpStatus.OK).json({ message: message });
    } catch (error) {
      res.status(HttpStatus.NOT_MODIFIED).json({ message: error.message });
    }
  }
}
