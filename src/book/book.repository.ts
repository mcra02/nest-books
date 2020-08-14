import { Repository, EntityRepository } from 'typeorm';
import { Book } from './models/book.model';
import {
  CreateBookDTO, UpdateBookDTO, PartialUpdateBookDTO
} from './DTO/book.dto';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
    findBooks? = async(): Promise<Book[]> => {
      return await this.find();
    }

    findOneBook? = async(id: number): Promise<Book> => {
      return await this.findOne(id);
    }

    createBook? = async(data:CreateBookDTO): Promise<Book> => {
      return await this.save({ ...data });
    }

    updateBook? = async (id:number, data:PartialUpdateBookDTO|UpdateBookDTO) => {
      return await this.update(id, { ...data });
    }

    deleteBook? = async (id:number) => {
      return await this.delete(id);
    }
}
