import {
  Controller, Body, Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { SessionPayload } from './models/session.payload';
import { SignUpDTO } from './DTO/signup.dto';
import { SignInDTO } from './DTO/signin.dto';

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
}
