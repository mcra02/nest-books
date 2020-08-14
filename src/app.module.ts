import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthorModule, BookModule],
  controllers: [],
  providers: []
})
export class AppModule {}
