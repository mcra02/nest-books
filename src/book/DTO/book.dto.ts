import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  Length, IsNotEmpty, IsNumber, Min, Max
} from 'class-validator';


export class CreateBookDTO {

    @ApiProperty({
      required: true,
      description: 'Title of Book',
      minLength: 6,
      maxLength: 50
    })
    @Length(6, 50, { message: 'The title must be at least 6 but not longer than 50 characters' })
    @IsNotEmpty({ message: 'The title is required' })
    title: string

    @ApiProperty({
      required: false,
      description: 'Description of Book',
      minLength: 6,
      maxLength: 50
    })
    description: string

    @ApiProperty({
      required: true,
      type: Number,
      minimum: 0,
      maximum: 150,
      description: 'Price of Book'
    })
    @IsNumber({}, { message: 'Please enter a valid number' })
    price: number

    @ApiProperty({
      required: true,
      type: Number,
      minimum: 5,
      maximum: 50,
      description: 'Quantity of Book'
    })
    @IsNumber(
      { maxDecimalPlaces: 2 },
      { message: 'Please enter a valid number' }
    )
    @Min(5)
    @Max(50)
    quantity: number

    @ApiProperty({
      required: true,
      type: Number,
      description: 'Author identifier'
    })
    @IsNumber({}, { message: 'Please enter a valid number' })
    authorId: number
}

export class UpdateBookDTO extends CreateBookDTO{}

export class PartialUpdateBookDTO extends PartialType(UpdateBookDTO){}
