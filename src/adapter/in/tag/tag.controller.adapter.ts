import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTagDto } from 'src/application/dto/tag/create-tag.dto';
import { ListTagDto } from 'src/application/dto/tag/list-tag.dto';
import { UpdateTagDto } from 'src/application/dto/tag/update-tag.dto';
import { PaginatedResponseMapper } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { TagHttpMapper } from 'src/application/mapper/tag/tag-http.mapper';
import { CreateTagUseCase } from 'src/application/use_case/tag/create-tag.usecase';
import { DeleteTagUseCase } from 'src/application/use_case/tag/delete-tag.usecase';
import { GetTagUseCase } from 'src/application/use_case/tag/get-tag.usecase';
import { ListTagUseCase } from 'src/application/use_case/tag/list-tag.usecase';
import { UpdateTagUseCase } from 'src/application/use_case/tag/update-tag.usecase';

@Controller('tags')
export class TagControllerAdapter {
  constructor(
    private readonly createTag: CreateTagUseCase,
    private readonly getTag: GetTagUseCase,
    private readonly deleteTag: DeleteTagUseCase,
    private readonly updateTag: UpdateTagUseCase,
    private readonly listTag: ListTagUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTagDto) {
    const result = await this.createTag.execute(TagHttpMapper.toCreateCommand(dto));
    return TagHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getTag.execute({ publicId });
    return TagHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListTagDto) {
    const query = TagHttpMapper.toListQuery(dto);
    const result = await this.listTag.execute(query);
    return PaginatedResponseMapper.toPaginatedDto(result, TagHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateTagDto) {
    const command = TagHttpMapper.toUpdateCommand(dto);
    const result = await this.updateTag.execute({ publicId }, command);
    return TagHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteTag.execute({ publicId });
    return { message: 'Tag deleted successfully' };
  }
}
