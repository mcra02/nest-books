import { Repository, EntityRepository } from 'typeorm';
import { Author } from './models/author.model';
import {
  CreateAuthorDTO, UpdateAuthorDTO, PartialUpdateAuthorDTO
} from './DTO/author.dto';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
    findAuthors? = async(): Promise<Author[]> => {
      try {
        return await this.find();
      } catch (error) {
        throw new Error(error);
      }
    }

    findOneAuthor? = async(id: number): Promise<Author> => {
      try {
        return await this.findOne(id);
      } catch (error) {
        throw new Error(error);
      }
    }

    createAuthor? = async(data:CreateAuthorDTO): Promise<Author> => {
      try {
        return await this.save({ ...data });
      } catch (error) {
        throw new Error(error);
      }
    }

    updateAuthor? = async (id:number, data:PartialUpdateAuthorDTO|UpdateAuthorDTO): Promise<boolean> => {
      try {
        await this.update(id, { ...data });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }

    deleteAuthor? = async (id:number): Promise<boolean> => {
      try {
        await this.delete(id);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }
}
