import {
  Injectable, UnauthorizedException, UnprocessableEntityException
} from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './DTO/signup.dto';
import { SessionPayload } from './models/session.payload';
import { SignInDTO } from './DTO/signin.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUserAuth(payload: Partial<User>): Promise<any> {
    const user = await this.userService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException('auth.errors.authentication');
    }
    return payload;
  }

  generateToken(payload:Partial<User>): string {
    return this.jwtService.sign(payload);
  }

  // async me(): Promise<SessionPayload>{
  //   return {};
  // }

  async signIn(data: SignInDTO): Promise<SessionPayload>{
    const { username, password } = data;
    const user = await this.userService.findOne(username);
    if(!user) throw new UnprocessableEntityException('User is not exists');
    const passIsValid = await user.comparePasswrod(password);
    if(!passIsValid) throw new UnprocessableEntityException('The credentials provided are not valid!');
    return this.provideSession(user);
  }

  async signUp(data: SignUpDTO): Promise<SessionPayload>{
    const {
      username, password, passwordConfirmation
    }  = data;

    if(password !== passwordConfirmation) throw new Error('password and passwordConfirmation don\'t match');

    const user = await this.userService.findOne(username);

    if(user) throw new UnprocessableEntityException('Username is not available');

    delete data.passwordConfirmation;

    const createUser =  await this.userService.create({ ...data });
    return this.provideSession(createUser);
  }

  private provideSession(user:User): SessionPayload{
    delete user.password;
    return {
      user,
      token: this.generateToken(user)
    };
  }
}
