import {
  Controller, Post, Body, Put, Param, Patch, Delete, Get
} from '@nestjs/common';
import {
  ApiTags, ApiCreatedResponse, ApiAcceptedResponse, ApiBearerAuth, ApiOperation
} from '@nestjs/swagger';
import { BookService } from './book.service';
import { Book } from './models/book.model';
import {
  CreateBookDTO, UpdateBookDTO, PartialUpdateBookDTO
} from './DTO/book.dto';
// import { AuthJWT } from 'src/auth/decorators/auth.user.decorator';
import { AppGateway } from 'src/app.gateway';

@ApiTags('Book')
@ApiBearerAuth()
@Controller('api/book')
export class BookController {
  constructor(
        private readonly bookService:BookService,
        private readonly wss: AppGateway
  ){}

  @Post()
  // @UseGuards(AuthJWT)
  @ApiCreatedResponse({
    description: 'The record has successfully created.',
    type: Book
  })
  @ApiOperation({
    summary: 'Add new book',
    description: 'This can only be done by the logged in user.'
  })
  async create(@Body() data: CreateBookDTO): Promise<Book>{
    const res: Book = await this.bookService.create(data);
    this.wss.emitActionData(process.env.WS_CHANNEL_BOOK, process.env.WS_CREATED, res);
    return res;
  }

  @Put(':id')
  // @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Book
  })
  @ApiOperation({
    summary: 'Updated book (Providing all parameters)',
    description: 'This can only be done by the logged in user.'
  })
  async update(@Param('id') id:number, @Body() data: UpdateBookDTO): Promise<Book>{
    const res: Book = await this.bookService.update(id, data);
    this.wss.emitActionData(process.env.WS_CHANNEL_BOOK, process.env.WS_UPDATED, res);
    return res;
  }

  @Patch(':id')
  // @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Book
  })
  @ApiOperation({
    summary: 'Updated book',
    description: 'This can only be done by the logged in user.'
  })
  async partial(@Param('id') id:number, @Body() data: PartialUpdateBookDTO): Promise<Book>{
    const res: Book = await this.bookService.update(id, data);
    this.wss.emitActionData(process.env.WS_CHANNEL_BOOK, process.env.WS_UPDATED, res);
    return res;
  }

  @Delete(':id')
  // @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Book
  })
  @ApiOperation({
    summary: 'Delete book',
    description: 'This can only be done by the logged in user.'
  })
  async delete(@Param('id') id:number): Promise<Book> {
    const res: Book = await this.bookService.delete(id);
    this.wss.emitActionData(process.env.WS_CHANNEL_BOOK, process.env.WS_DELETED, res);
    return res;
  }

  @Get()
  // @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully find all.',
    type: [Book]
  })
  @ApiOperation({
    summary: 'Get books',
    description: 'This can only be done by the logged in user.'
  })
  async findAll(): Promise<Book[]>{
    const res: Book[] = await this.bookService.find();
    return res;
  }

  @Get(':id')
  // @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully find all.',
    type: Book
  })
  @ApiOperation({
    summary: 'Get book by id',
    description: 'This can only be done by the logged in user.'
  })
  async findOne(@Param('id') id:number): Promise<Book>{
    const res: Book = await this.bookService.findOne(id);
    return res;
  }
}
