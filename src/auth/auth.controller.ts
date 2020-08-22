import {
  Controller, Body, Post, Get, UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags, ApiCreatedResponse, ApiBearerAuth
} from '@nestjs/swagger';
import { SessionPayload } from './models/session.payload';
import { SignUpDTO } from './DTO/signup.dto';
import { SignInDTO } from './DTO/signin.dto';
import { AuthJWT } from './decorators/auth.user.decorator';
import { CurrentUser } from './decorators/current.user.decorator';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(
        private readonly authService: AuthService
  ){}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Login was successfully',
    type: SessionPayload
  })
  async signup(@Body() data: SignUpDTO): Promise<SessionPayload> {
    return this.authService.signUp(data);
  }

  @Post('signin')
  @ApiCreatedResponse({
    description: 'Registration was successfully',
    type: SessionPayload
  })
  async signin(@Body() data: SignInDTO): Promise<SessionPayload> {
    return this.authService.signIn(data);
  }

  @Get('me')
  @UseGuards(AuthJWT)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Request me was successfully',
    type: SessionPayload
  })
  async me(
    @CurrentUser('username') username:string
  ): Promise<SessionPayload>{
    return this.authService.me(username);
  }
}
