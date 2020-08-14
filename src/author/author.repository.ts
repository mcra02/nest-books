import { Repository, EntityRepository } from 'typeorm';
import { Author } from './models/author.model';
import {
  CreateAuthorDTO, UpdateAuthorDTO, PartialUpdateAuthorDTO
} from './DTO/author.dto';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
    findAuthors? = async(): Promise<Author[]> => {
      return await this.find();
    }

    findOneAuthor? = async(id: number): Promise<Author> => {
      return await this.findOne(id);
    }

    createAuthor? = async(data:CreateAuthorDTO): Promise<Author> => {
      return await this.save({ ...data });
    }

    updateAuthor? = async (id:number, data:PartialUpdateAuthorDTO|UpdateAuthorDTO) => {
      return await this.update(id, { ...data });
    }

    deleteAuthor? = async (id:number) => {
      return await this.delete(id);
    }
}
