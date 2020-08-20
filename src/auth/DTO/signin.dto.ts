import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty } from 'class-validator';


export class SignInDTO{

    @ApiProperty({
      type: String,
      minLength: 4,
      maxLength: 10,
      required: true
    })
    @Length(4, 10, {
      message:
        'The username must be at least 4 but not longer than 10 characters'
    })
    @IsNotEmpty({ message: 'The username is required' })
    username: string;

    @ApiProperty({
      type: String,
      minLength: 4,
      maxLength: 12,
      required: true
    })
    @Length(4, 12, { message: 'The email must be at least 4 but not longer than 12 characters' })
    @IsNotEmpty({ message: 'The password is required' })
    password:string

}
