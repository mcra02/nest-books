import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './models/book.model';
import {
  CreateBookDTO, PartialUpdateBookDTO, UpdateBookDTO
} from './DTO/book.dto';
import { CreateBookInput, UpdateBookInput } from './DTO/book.input';

@Injectable()
export class BookService {
  constructor(
        private readonly _bookRepository: BookRepository
  ){}

  async find():Promise<Book[]>{
    try {
      return await this._bookRepository.findBooks();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(
    id:number
  ):Promise<Book> {
    try {
      return await this._bookRepository.findOneBook(id);

    } catch (error) {
      throw new Error(error);
    }
  }

  async create(
    data:CreateBookDTO|CreateBookInput
  ): Promise<Book>{
    try {
      return await this._bookRepository.createBook(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id:number,
    data:PartialUpdateBookDTO|UpdateBookDTO|UpdateBookInput
  ): Promise<Book>{
    try {
      await this._bookRepository.updateBook(id, data);
      return await this.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(
    id:number
  ): Promise<Book> {
    try {
      const Book = await this.findOne(id);
      await this._bookRepository.deleteBook(id);
      return Book;
    } catch (error) {
      throw new Error(error);
    }
  }
}
