import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  providers: [AuthorService, AppGateway],
  controllers: [AuthorController]
})
export class AuthorModule {}
