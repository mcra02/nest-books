import { Inject, UseGuards } from '@nestjs/common';
import {
  Args, Mutation, Query, Resolver, Subscription
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard } from 'src/auth/decorators/auth.user.decorator';
import { AuthorService } from './author.service';
import { AuthorArgsID } from './DTO/author.args';
import { CreateAuthorInput, UpdateAuthorInput } from './DTO/author.input';
import { Author, AuthorSubscription } from './models/author.model';

@Resolver('Author')
export class AuthorResolver {
  constructor(
        @Inject('PUB_SUB')
        private readonly pubsub: PubSub,
        private readonly _authorService: AuthorService
  ){}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Author])
  async allAuthors(): Promise<Author[]> {
    const res: Author[] = await this._authorService.find();
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Author])
  async oneAuthor(
      @Args() { id } : AuthorArgsID
  ): Promise<Author> {
    const res: Author = await this._authorService.findOne(id);
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Author)
  async createAuthor(
  @Args('data') data: CreateAuthorInput
  ): Promise<Author> {
    const res: Author = await this._authorService.create(data);
    this.pubsub.publish(process.env.WS_CHANNEL_AUTHOR, {
      bookPubSub: {
        action: process.env.WS_CREATED,
        data: res
      } as AuthorSubscription
    });
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Author)
  async updateAuthor(
  @Args('data') data: UpdateAuthorInput,
  @Args() { id }: AuthorArgsID
  ): Promise<Author> {
    const res: Author = await this._authorService.update(id, data);
    this.pubsub.publish(process.env.WS_CHANNEL_AUTHOR, {
      bookPubSub: {
        action: process.env.WS_UPDATED,
        data: res
      } as AuthorSubscription
    });
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Author)
  async deleteAuthor(
  @Args() { id }: AuthorArgsID
  ): Promise<Author> {
    const res: Author = await this._authorService.delete(id);
    this.pubsub.publish(process.env.WS_CHANNEL_AUTHOR, {
      bookPubSub: {
        action: process.env.WS_DELETED,
        data: res
      } as AuthorSubscription
    });
    return res;
  }

  @Subscription(() => AuthorSubscription)
  authorPubSub(){
    return this.pubsub.asyncIterator(process.env.WS_CHANNEL_AUTHOR);
  }
}
