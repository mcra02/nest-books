import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthorModule, BookModule, UserModule, AuthModule, ConfigModule.forRoot({ envFilePath: '.env' })],
  controllers: [],
  providers: [AppGateway],
  exports: [AppGateway]
})
export class AppModule {}
