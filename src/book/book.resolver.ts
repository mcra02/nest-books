import { Inject, UseGuards } from '@nestjs/common';
import {
  Args, Mutation, Query, Resolver, Subscription
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard } from 'src/auth/decorators/auth.user.decorator';
import { BookService } from './book.service';
import { BookArgsID } from './DTO/book.args';
import { CreateBookInput, UpdateBookInput } from './DTO/book.input';
import { Book, BookSubscription } from './models/book.model';

@Resolver('Book')
export class BookResolver {
  constructor(
          @Inject('PUB_SUB')
          private readonly pubsub: PubSub,
          private readonly _bookService: BookService
  ){}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Book])
  async allBooks(): Promise<Book[]> {
    const res: Book[] = await this._bookService.find();
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Book])
  async oneBook(
      @Args() { id } : BookArgsID
  ): Promise<Book> {
    const res: Book = await this._bookService.findOne(id);
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async createBook(
    @Args('data') data: CreateBookInput
  ): Promise<Book> {
    const res: Book = await this._bookService.create(data);
    this.pubsub.publish(process.env.WS_CHANNEL_BOOK, {
      bookPubSub: {
        action: process.env.WS_CREATED,
        data: res
      } as BookSubscription
    });
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async updateBook(
    @Args('data') data: UpdateBookInput,
    @Args() { id }: BookArgsID
  ): Promise<Book> {
    const res: Book = await this._bookService.update(id, data);
    this.pubsub.publish(process.env.WS_CHANNEL_BOOK, {
      bookPubSub: {
        action: process.env.WS_UPDATED,
        data: res
      } as BookSubscription
    });
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async deleteBook(
    @Args() { id }: BookArgsID
  ): Promise<Book> {
    const res: Book = await this._bookService.delete(id);
    this.pubsub.publish(process.env.WS_CHANNEL_BOOK, {
      bookPubSub: {
        action: process.env.WS_DELETED,
        data: res
      } as BookSubscription
    });
    return res;
  }

  @Subscription(() => BookSubscription)
  bookPubSub(){
    return this.pubsub.asyncIterator(process.env.WS_CHANNEL_BOOK);
  }
}
