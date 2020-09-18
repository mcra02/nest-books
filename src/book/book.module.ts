import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { AppGateway } from 'src/app.gateway';
import { BookResolver } from './book.resolver';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub
    },
    BookService,
    AppGateway,
    BookResolver
  ],
  controllers: [BookController]
})
export class BookModule {}
