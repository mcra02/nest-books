import {
  Controller, Body, Post, Put, Param, Get, Patch, Delete
} from '@nestjs/common';
import { AuthorService } from './author.service';
import {
  CreateAuthorDTO, PartialUpdateAuthorDTO, UpdateAuthorDTO
} from './DTO/author.dto';
import {
  ApiTags,  ApiCreatedResponse, ApiAcceptedResponse, ApiBearerAuth, ApiOperation
} from '@nestjs/swagger';
import { Author } from './models/author.model';
// import { AuthJWT } from 'src/auth/decorators/auth.user.decorator';
import { AppGateway } from 'src/app.gateway';

@ApiTags('Author')
@ApiBearerAuth()
@Controller('api/author')
export class AuthorController {
  constructor(
        private readonly authorService:AuthorService,
        private readonly wss: AppGateway
  ){}

  @Post()
  // @UseGuards(AuthJWT)
  @ApiCreatedResponse({
    description: 'The record has successfully created.',
    type: Author
  })
  @ApiOperation({
    summary: 'Add new author',
    description: 'This can only be done by the logged in user.'
  })
  async create(@Body() data: CreateAuthorDTO): Promise<Author>{
    const res: Author = await this.authorService.create(data);
    this.wss.emitActionData(process.env.WS_CHANNEL_AUTHOR, process.env.WS_CREATED, res);
    return res;
  }

  @Put(':id')
  // @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Author
  })
  @ApiOperation({
    summary: 'Updated author (Providing all parameters)',
    description: 'This can only be done by the logged in user.'
  })
  async update(@Param('id') id:number, @Body() data: UpdateAuthorDTO): Promise<Author>{
    const res: Author = await this.authorService.update(id, data);
    this.wss.emitActionData(process.env.WS_CHANNEL_AUTHOR, process.env.WS_UPDATED, res);
    return res;
  }

  @Patch(':id')
  // @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Author
  })
  @ApiOperation({
    summary: 'Updated author',
    description: 'This can only be done by the logged in user.'
  })
  async partial(@Param('id') id:number, @Body() data: PartialUpdateAuthorDTO): Promise<Author>{
    const res: Author = await this.authorService.update(id, data);
    this.wss.emitActionData(process.env.WS_CHANNEL_AUTHOR, process.env.WS_UPDATED, res);
    return res;
  }

  @Delete(':id')
  // @UseGuards(AuthJWT)
  @ApiAcceptedResponse({
    description: 'The record has successfully updated.',
    type: Author
  })
  @ApiOperation({
    summary: 'Delete author',
    description: 'This can only be done by the logged in user.'
  })
  async delete(@Param('id') id:number): Promise<Author> {
    const res:Author =  await this.authorService.delete(id);
    this.wss.emitActionData(process.env.WS_CHANNEL_AUTHOR, process.env.WS_DELETED, res);
    return res;
  }

  @Get()
  // @UseGuards(AuthJWT)
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
  // @UseGuards(AuthJWT)
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
