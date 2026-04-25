import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProjectTagDto } from 'src/application/dto/project-tag/create-project-tag.dto';
import { ListProjectTagDto } from 'src/application/dto/project-tag/list-project-tag.dto';
import { UpdateProjectTagDto } from 'src/application/dto/project-tag/update-project-tag.dto';
import { PaginatedResponseMapper } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { ProjectTagHttpMapper } from 'src/application/mapper/project-tag/project-tag-http.mapper';
import { CreateProjectTagUseCase } from 'src/application/use_case/project-tag/create-project-tag.usecase';
import { DeleteProjectTagUseCase } from 'src/application/use_case/project-tag/delete-project-tag.usecase';
import { GetProjectTagUseCase } from 'src/application/use_case/project-tag/get-project-tag.usecase';
import { ListProjectTagUseCase } from 'src/application/use_case/project-tag/list-project-tag.usecase';
import { UpdateProjectTagUseCase } from 'src/application/use_case/project-tag/update-project-tag.usecase';

@Controller('project-tags')
export class ProjectTagControllerAdapter {
  constructor(
    private readonly createProjectTag: CreateProjectTagUseCase,
    private readonly getProjectTag: GetProjectTagUseCase,
    private readonly deleteProjectTag: DeleteProjectTagUseCase,
    private readonly updateProjectTag: UpdateProjectTagUseCase,
    private readonly listProjectTag: ListProjectTagUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateProjectTagDto) {
    const result = await this.createProjectTag.execute(ProjectTagHttpMapper.toCreateCommand(dto));
    return ProjectTagHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getProjectTag.execute({ publicId });
    return ProjectTagHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListProjectTagDto) {
    const query = ProjectTagHttpMapper.toListQuery(dto);
    const result = await this.listProjectTag.execute(query);
    return PaginatedResponseMapper.toPaginatedDto(result, ProjectTagHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateProjectTagDto) {
    const command = ProjectTagHttpMapper.toUpdateCommand(dto);
    const result = await this.updateProjectTag.execute({ publicId }, command);
    return ProjectTagHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteProjectTag.execute({ publicId });
    return { message: 'ProjectTag deleted successfully' };
  }
}
