import {
  Field, InputType, PartialType
} from '@nestjs/graphql';


@InputType()
export class CreateAuthorInput{
    @Field({ nullable: false })
    name: string

    @Field({ nullable: false })
    country: string
}

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput){}
