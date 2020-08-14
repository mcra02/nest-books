import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { Author } from './models/author.model';
import {
  CreateAuthorDTO, UpdateAuthorDTO, PartialUpdateAuthorDTO
} from './DTO/author.dto';

@Injectable()
export class AuthorService {
  constructor(
        private readonly _authorRepository: AuthorRepository
  ){}

  async find():Promise<Author[]>{
    return await this._authorRepository.findAuthors();
  }

  async findOne(id:number):Promise<Author> {
    return await this._authorRepository.findOneAuthor(id);
  }

  async create(data:CreateAuthorDTO): Promise<Author>{
    return await this._authorRepository.createAuthor(data);
  }

  async update(id:number, data:PartialUpdateAuthorDTO|UpdateAuthorDTO): Promise<Author>{
    await this._authorRepository.updateAuthor(id, data);
    return await this.findOne(id);
  }

  async delete(id:number): Promise<Author> {
    const author = await this.findOne(id);
    await this._authorRepository.deleteAuthor(id);
    return author;
  }
}
