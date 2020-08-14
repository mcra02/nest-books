import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './models/book.model';
import {
  CreateBookDTO, PartialUpdateBookDTO, UpdateBookDTO
} from './DTO/book.dto';

@Injectable()
export class BookService {
  constructor(
        private readonly _bookRepository: BookRepository
  ){}

  async find():Promise<Book[]>{
    return await this._bookRepository.findBooks();
  }

  async findOne(id:number):Promise<Book> {
    return await this._bookRepository.findOneBook(id);
  }

  async create(data:CreateBookDTO): Promise<Book>{
    return await this._bookRepository.createBook(data);
  }

  async update(id:number, data:PartialUpdateBookDTO|UpdateBookDTO): Promise<Book>{
    await this._bookRepository.updateBook(id, data);
    return await this.findOne(id);
  }

  async delete(id:number): Promise<Book> {
    const Book = await this.findOne(id);
    await this._bookRepository.deleteBook(id);
    return Book;
  }
}
