import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAuthorDTO {
  @ApiProperty({
    required: true,
    description: 'Name of Author',
    minLength: 4,
    maxLength: 12
  })
  name: string;

  @ApiProperty({
    required: true,
    description: 'Country of Author',
    minLength: 3,
    maxLength: 12
  })
  country: string;
}

export class UpdateAuthorDTO extends CreateAuthorDTO {}

export class PartialUpdateAuthorDTO extends PartialType(UpdateAuthorDTO){}
