import { UseGuards } from '@nestjs/common';
import {
  Args, Mutation, Query, Resolver
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/decorators/auth.user.decorator';
import { BookService } from './book.service';
import { BookArgsID } from './DTO/book.args';
import { CreateBookInput, UpdateBookInput } from './DTO/book.input';
import { Book } from './models/book.model';

@Resolver('Book')
export class BookResolver {
  constructor(
          private readonly _bookService: BookService
  ){}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Book])
  async allBooks(): Promise<Book[]> {
    return await this._bookService.find();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Book])
  async oneBook(
      @Args() { id } : BookArgsID
  ): Promise<Book> {
    return await this._bookService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async createBook(
    @Args('data') data: CreateBookInput
  ): Promise<Book> {
    return await this._bookService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async updateBook(
    @Args('data') data: UpdateBookInput,
    @Args() { id }: BookArgsID
  ): Promise<Book> {
    return await this._bookService.update(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async deleteBook(
    @Args() { id }: BookArgsID
  ): Promise<Book> {
    return await this._bookService.delete(id);
  }
}
