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
    try {
      return await this._authorRepository.findAuthors();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id:number):Promise<Author> {
    try {
      return await this._authorRepository.findOneAuthor(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data:CreateAuthorDTO): Promise<Author>{
    try {
      return await this._authorRepository.createAuthor(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id:number, data:PartialUpdateAuthorDTO|UpdateAuthorDTO): Promise<Author>{
    try {
      await this._authorRepository.updateAuthor(id, data);
      return await this.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id:number): Promise<Author> {
    try {
      const author = await this.findOne(id);
      await this._authorRepository.deleteAuthor(id);
      return author;
    } catch (error) {
      throw new Error(error);
    }
  }
}
