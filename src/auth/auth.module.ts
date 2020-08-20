import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';

dotenv.config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '2d' }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
