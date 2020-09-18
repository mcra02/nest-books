import {
  Field, ArgsType, ID
} from '@nestjs/graphql';

@ArgsType()
export class BookArgsID {
    @Field(() => ID, { nullable: false })
    id: number;
}
