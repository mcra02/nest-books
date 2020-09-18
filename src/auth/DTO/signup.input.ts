import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class SignUpInput{

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    @IsEmail()
    email: string;

    @Field({ nullable: false })
    password:string

    @Field({ nullable: false })
    passwordConfirmation: string
}
