import {
  Field, Float, ID, InputType, Int, PartialType
} from '@nestjs/graphql';


@InputType()
export class CreateBookInput{
    @Field({ nullable: false })
    title: string

    @Field({ nullable: false })
    description: string

    @Field(() => Float, { nullable: false })
    price: number

    @Field(() => Int, { nullable: false })
    quantity: number

    @Field(() => ID, { nullable: true })
    authorId: number
}

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput){}
