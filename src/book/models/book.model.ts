import {
  Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne
} from 'typeorm';
import { Author } from 'src/author/models/author.model';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty } from 'class-validator';


@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    @ApiResponseProperty({ type: Number })
    id: number

    @Column('varchar', {
      nullable: false,
      length: 12
    })
    @ApiResponseProperty({ type: String })
    @Length(6, 50, { message: 'The name must be at least 6 but not longer than 50 characters' })
    @IsNotEmpty({ message: 'The name is required' })
    title: string

    @Column('varchar', {
      nullable: true,
      length: 12
    })
    @ApiResponseProperty({ type: String })
    description: string

    @Column('double', { nullable: false })
    @ApiResponseProperty({ type: Number })
    price: number

    @Column('int', { nullable: false })
    @ApiResponseProperty({ type: Number })
    quantity: number

    @JoinColumn()
    @ManyToOne(() => Author, author => author.books, { onDelete: 'CASCADE' })
    // @ApiResponseProperty({ type: () => Author })
    author: Author
}
