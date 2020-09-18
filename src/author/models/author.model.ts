import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Book } from 'src/book/models/book.model';
import {
  Field, ID, ObjectType
} from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Author {

    @Field(() => ID, { nullable: false })
    @PrimaryGeneratedColumn()
    @ApiResponseProperty({ type: Number })
    id: number

    @Field({ nullable: false })
    @Column('varchar', {
      nullable: false,
      length: 12
    })
    @ApiResponseProperty({ type: String })
    @Length(4, 12, { message: 'The name must be at least 4 but not longer than 12 characters' })
    @IsNotEmpty({ message: 'The name is required' })
    name: string

    @Field({ nullable: false })
    @Column('varchar', {
      nullable: false,
      length: 50
    })
    @ApiResponseProperty({ type: String })
    @Length(3, 12, { message: 'The name must be at least 3 but not longer than 12 characters' })
    @IsNotEmpty({ message: 'The country is required' })
    country: string

    // @Field(() => Book,{ nullable: false })
    @OneToMany(() => Book, book => book.author)
    // @ApiResponseProperty({ type: () =>  [Book] })
    books: Book[]
}
