import {
  Entity, Column, PrimaryColumn
} from 'typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty } from 'class-validator';
import { IsUniq } from '@join-com/typeorm-class-validator-is-uniq';
import {
  Field, ID, ObjectType
} from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  @PrimaryColumn('varchar', {
    nullable: false,
    length: 10
  })
  @ApiResponseProperty({ type: String })
  @Length(4, 10, {
    message:
      'The username must be at least 4 but not longer than 10 characters'
  })
  @IsNotEmpty({ message: 'The username is required' })
  username: string;

  @Field({ nullable: false })
  @Column('varchar', {
    nullable: false,
    length: 100
  })
  @ApiResponseProperty({ type: String })
  @IsUniq()
  @Length(5, 100, { message: 'The email must be at least 5 but not longer than 100 characters' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @Column('varchar', {
    nullable: false,
    length: 300
  })
  @IsNotEmpty({ message: 'The password is required' })
  password:string
}
