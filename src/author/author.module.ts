import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { AppGateway } from 'src/app.gateway';
import { AuthorResolver } from './author.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  providers: [AuthorService, AppGateway, AuthorResolver],
  controllers: [AuthorController]
})
export class AuthorModule {}
