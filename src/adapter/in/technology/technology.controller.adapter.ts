import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTechnologyDto } from 'src/application/dto/technology/create-technology.dto';
import { ListTechnologyDto } from 'src/application/dto/technology/list-technology.dto';
import { UpdateTechnologyDto } from 'src/application/dto/technology/update-technology.dto';
import { PaginatedResponseMapper } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { TechnologyHttpMapper } from 'src/application/mapper/technology/technology-http.mapper';
import { CreateTechnologyUseCase } from 'src/application/use_case/technology/create-technology.usecase';
import { DeleteTechnologyUseCase } from 'src/application/use_case/technology/delete-technology.usecase';
import { GetTechnologyUseCase } from 'src/application/use_case/technology/get-technology.usecase';
import { ListTechnologyUseCase } from 'src/application/use_case/technology/list-technology.usecase';
import { UpdateTechnologyUseCase } from 'src/application/use_case/technology/update-technology.usecase';

@Controller('technologies')
export class TechnologyControllerAdapter {
  constructor(
    private readonly createTechnology: CreateTechnologyUseCase,
    private readonly getTechnology: GetTechnologyUseCase,
    private readonly deleteTechnology: DeleteTechnologyUseCase,
    private readonly updateTechnology: UpdateTechnologyUseCase,
    private readonly listTechnology: ListTechnologyUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTechnologyDto) {
    const result = await this.createTechnology.execute(
      TechnologyHttpMapper.toCreateCommand(dto),
    );
    return TechnologyHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getTechnology.execute({ publicId });
    return TechnologyHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListTechnologyDto) {
    const query = TechnologyHttpMapper.toListQuery(dto);
    const result = await this.listTechnology.execute(query);
    return PaginatedResponseMapper.toPaginatedDto(result, TechnologyHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateTechnologyDto) {
    const command = TechnologyHttpMapper.toUpdateCommand(dto);
    const result = await this.updateTechnology.execute({ publicId }, command);
    return TechnologyHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteTechnology.execute({ publicId });
    return { message: 'Technology deleted successfully' };
  }
}
