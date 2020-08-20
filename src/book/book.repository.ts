import { Repository, EntityRepository } from 'typeorm';
import { Book } from './models/book.model';
import {
  CreateBookDTO, UpdateBookDTO, PartialUpdateBookDTO
} from './DTO/book.dto';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
    findBooks? = async(): Promise<Book[]> => {
      try {
        return await this.find();
      } catch (error) {
        throw new Error(error);
      }
    }

    findOneBook? = async(id: number): Promise<Book> => {
      try {
        return await this.findOne(id);
      } catch (error) {
        throw new Error(error);
      }
    }

    createBook? = async(data:CreateBookDTO): Promise<Book> => {
      try {
        return await this.save({ ...data });
      } catch (error) {
        throw new Error(error);
      }
    }

    updateBook? = async (id:number, data:PartialUpdateBookDTO|UpdateBookDTO): Promise<boolean> => {
      try {
        await this.update(id, { ...data });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }

    deleteBook? = async (id:number): Promise<boolean> => {
      try {
        await this.delete(id);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }
}
