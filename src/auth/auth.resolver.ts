import { UseGuards } from '@nestjs/common';
import {
  Args, Mutation, Query, Resolver
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './decorators/auth.user.decorator';
import { CurrentUserGQL } from './decorators/current.user.decorator';
import { SignInInput } from './DTO/signin.input';
import { SignUpInput } from './DTO/signup.input';
import { SessionPayload } from './models/session.payload';

@Resolver('Auth')
export class AuthResolver {

  constructor(
        private readonly _authService: AuthService
  ){}

  @Mutation(() => SessionPayload)
  async signUp(@Args('data') data: SignUpInput): Promise<SessionPayload> {
    return await this._authService.signUp(data);
  }

  @Mutation(() => SessionPayload)
  async signIn(@Args('data') data: SignInInput): Promise<SessionPayload> {
    return await this._authService.signIn(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => SessionPayload)
  async me(@CurrentUserGQL('username') username: string): Promise<SessionPayload> {
    return await this._authService.me(username);
  }
}
