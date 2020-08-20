import { EntityRepository, Repository } from 'typeorm';
import { User }
  from './models/user.model';


@EntityRepository(User)
export class UserRepository extends Repository<User>{
    findUsers? = async(): Promise<User[]> => {
      try {
        return await this.find();
      } catch (error) {
        throw new Error(error);
      }
    }

    findUser? = async (username:string): Promise<User> => {
      try {
        return await this.findOne(username);
      } catch (error) {
        throw new Error(error);
      }
    }

    createUser? = async (data: User): Promise<User> => {
      try {
        return await this.save({ ...data });
      } catch (error) {
        throw new Error(error);
      }
    }

    updateUser? = async (username:string, data: User):Promise<boolean> => {
      try {
        await this.update(username, { ...data });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }

    deleteUser? = async (username:string): Promise<boolean> => {
      try {
        await this.delete(username);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }
}
