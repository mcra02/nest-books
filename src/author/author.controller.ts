import {
  Controller, Body, Post, Put, Param, Get, Patch, Delete
} from '@nestjs/common';
import { AuthorService } from './author.service';
import {
  CreateAuthorDTO, PartialUpdateAuthorDTO, UpdateAuthorDTO
} from './DTO/author.dto';
import {
  ApiTags,  ApiCreatedResponse, ApiAcceptedResponse
} from '@nestjs/swagger';
import { Author } from './models/author.model';

@ApiTags('Author')
@Controller('api/author')
export class AuthorController {
  constructor(
        private readonly authorService:AuthorService
  ){}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has successfully created.',
    type: Author
  })
  async create(@Body() data: CreateAuthorDTO): Promise<Author>{
    return await this.authorService.create(data);
  }

  @Put(':id')
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Author
  })
  async update(@Param('id') id:number, @Body() data: UpdateAuthorDTO): Promise<Author>{
    return await this.authorService.update(id, data);
  }

  @Patch(':id')
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Author
  })
  async partial(@Param('id') id:number, @Body() data: PartialUpdateAuthorDTO): Promise<Author>{
    return await this.authorService.update(id, data);
  }

  @Delete(':id')
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Author
  })
  async delete(@Param('id') id:number): Promise<Author> {
    return await this.authorService.delete(id);
  }

  @Get()
  @ApiAcceptedResponse({
    description: 'The record has successfully find all.',
    type: [Author]
  })
  async findAll(): Promise<Author[]>{
    return await this.authorService.find();
  }

  @Get(':id')
  @ApiAcceptedResponse({
    description: 'The record has successfully find all.',
    type: Author
  })
  async findOne(@Param('id') id:number): Promise<Author>{
    return await this.authorService.findOne(id);
  }
}
