import {
  Controller, Post, Body, Put, Param, Patch, Delete, Get, UseGuards
} from '@nestjs/common';
import {
  ApiTags, ApiCreatedResponse, ApiAcceptedResponse, ApiBearerAuth
} from '@nestjs/swagger';
import { BookService } from './book.service';
import { Book } from './models/book.model';
import {
  CreateBookDTO, UpdateBookDTO, PartialUpdateBookDTO
} from './DTO/book.dto';
import { AuthJWT } from 'src/auth/decorators/auth.user.decorator';

@ApiTags('Book')
@ApiBearerAuth()
@Controller('api/book')
export class BookController {
  constructor(
        private readonly bookService:BookService
  ){}

  @Post()
  @UseGuards(AuthJWT)
  @ApiCreatedResponse({
    description: 'The record has successfully created.',
    type: Book
  })
  async create(@Body() data: CreateBookDTO): Promise<Book>{
    return await this.bookService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Book
  })
  async update(@Param('id') id:number, @Body() data: UpdateBookDTO): Promise<Book>{
    return await this.bookService.update(id, data);
  }

  @Patch(':id')
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Book
  })
  async partial(@Param('id') id:number, @Body() data: PartialUpdateBookDTO): Promise<Book>{
    return await this.bookService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Book
  })
  async delete(@Param('id') id:number): Promise<Book> {
    return await this.bookService.delete(id);
  }

  @Get()
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully find all.',
    type: [Book]
  })
  async findAll(): Promise<Book[]>{
    return await this.bookService.find();
  }

  @Get(':id')
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully find all.',
    type: Book
  })
  async findOne(@Param('id') id:number): Promise<Book>{
    return await this.bookService.findOne(id);
  }
}
