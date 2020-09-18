import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';


@ObjectType()
export class SessionPayload{
    @Field(() => User, { nullable: false })
    user: Partial<User>

    @Field({ nullable: false })
    token: string
}
