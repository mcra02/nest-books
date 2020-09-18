import { UseGuards } from '@nestjs/common';
import {
  Args, Mutation, Query, Resolver
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/decorators/auth.user.decorator';
import { AuthorService } from './author.service';
import { AuthorArgsID } from './DTO/author.args';
import { CreateAuthorInput, UpdateAuthorInput } from './DTO/author.input';
import { Author } from './models/author.model';

@Resolver('Author')
export class AuthorResolver {
  constructor(
        private readonly _authorService: AuthorService
  ){}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Author])
  async allAuthors(): Promise<Author[]> {
    return await this._authorService.find();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Author])
  async oneAuthor(
      @Args() { id } : AuthorArgsID
  ): Promise<Author> {
    return await this._authorService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Author)
  async createAuthor(
  @Args('data') data: CreateAuthorInput
  ): Promise<Author> {
    return await this._authorService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Author)
  async updateAuthor(
  @Args('data') data: UpdateAuthorInput,
  @Args() { id }: AuthorArgsID
  ): Promise<Author> {
    return await this._authorService.update(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Author)
  async deleteAuthor(
  @Args() { id }: AuthorArgsID
  ): Promise<Author> {
    return await this._authorService.delete(id);
  }
}
