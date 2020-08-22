import {
  Controller, Body, Post, Put, Param, Get, Patch, Delete, UseGuards
} from '@nestjs/common';
import { AuthorService } from './author.service';
import {
  CreateAuthorDTO, PartialUpdateAuthorDTO, UpdateAuthorDTO
} from './DTO/author.dto';
import {
  ApiTags,  ApiCreatedResponse, ApiAcceptedResponse, ApiBearerAuth, ApiOperation
} from '@nestjs/swagger';
import { Author } from './models/author.model';
import { AuthJWT } from 'src/auth/decorators/auth.user.decorator';

@ApiTags('Author')
@ApiBearerAuth()
@Controller('api/author')
export class AuthorController {
  constructor(
        private readonly authorService:AuthorService
  ){}

  @Post()
  @UseGuards(AuthJWT)
  @ApiCreatedResponse({
    description: 'The record has successfully created.',
    type: Author
  })
  @ApiOperation({
    summary: 'Add new author',
    description: 'This can only be done by the logged in user.'
  })
  async create(@Body() data: CreateAuthorDTO): Promise<Author>{
    return await this.authorService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Author
  })
  @ApiOperation({
    summary: 'Updated author (Providing all parameters)',
    description: 'This can only be done by the logged in user.'
  })
  async update(@Param('id') id:number, @Body() data: UpdateAuthorDTO): Promise<Author>{
    return await this.authorService.update(id, data);
  }

  @Patch(':id')
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Author
  })
  @ApiOperation({
    summary: 'Updated author',
    description: 'This can only be done by the logged in user.'
  })
  async partial(@Param('id') id:number, @Body() data: PartialUpdateAuthorDTO): Promise<Author>{
    return await this.authorService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Author
  })
  @ApiOperation({
    summary: 'Delete author',
    description: 'This can only be done by the logged in user.'
  })
  async delete(@Param('id') id:number): Promise<Author> {
    return await this.authorService.delete(id);
  }

  @Get()
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully find all.',
    type: [Author]
  })
  @ApiOperation({
    summary: 'Get Authors',
    description: 'This can only be done by the logged in user.'
  })
  async findAll(): Promise<Author[]>{
    return await this.authorService.find();
  }

  @Get(':id')
  @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully find all.',
    type: Author
  })
  @ApiOperation({
    summary: 'Get Author by id',
    description: 'This can only be done by the logged in user.'
  })
  async findOne(@Param('id') id:number): Promise<Author>{
    return await this.authorService.findOne(id);
  }
}
