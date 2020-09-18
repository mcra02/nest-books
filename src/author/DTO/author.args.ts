import {
  Field, ArgsType, ID
} from '@nestjs/graphql';

@ArgsType()
export class AuthorArgsID {
    @Field(() => ID, { nullable: false })
    id: number;
}
