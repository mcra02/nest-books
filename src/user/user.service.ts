import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository
  ){}

  async find(): Promise<User[]>{
    try {
      return await this._userRepository.findUsers();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(username:string): Promise<User>{
    try {
      return await this._userRepository.findUser(username);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data:User): Promise<User>{
    try {
      return await this._userRepository.createUser(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(username:string, data:User): Promise<User>{
    try {
      await this._userRepository.updateUser(username, data);
      return await this.findOne(username);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(username:string): Promise<User>{
    try {
      const user = await this.findOne(username);
      await this._userRepository.deleteUser(username);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
