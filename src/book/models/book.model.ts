import {
  Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne
} from 'typeorm';
import { Author } from 'src/author/models/author.model';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty } from 'class-validator';
import {
  Field, Float, ID, Int, ObjectType
} from '@nestjs/graphql';


@Entity()
@ObjectType()
export class Book {
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
    @Length(6, 50, { message: 'The name must be at least 6 but not longer than 50 characters' })
    @IsNotEmpty({ message: 'The name is required' })
    title: string

    @Field({ nullable: false })
    @Column('varchar', {
      nullable: true,
      length: 12
    })
    @ApiResponseProperty({ type: String })
    description: string

    @Field(() => Float, { nullable: false })
    @Column('double', { nullable: false })
    @ApiResponseProperty({ type: Number })
    price: number

    @Field(() => Int, { nullable: false })
    @Column('int', { nullable: false })
    @ApiResponseProperty({ type: Number })
    quantity: number

    // @Field(() => Author, { nullable: true })
    @JoinColumn()
    @ManyToOne(() => Author, author => author.books, { onDelete: 'CASCADE' })
    // @ApiResponseProperty({ type: () => Author })
    author: Author
}
