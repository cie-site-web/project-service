import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProjectDto } from 'src/application/dto/project/create-project.dto';
import { ListProjectDto } from 'src/application/dto/project/list-project.dto';
import { UpdateProjectDto } from 'src/application/dto/project/update-project.dto';
import { PaginatedResponseMapper } from 'src/application/mapper/paginate/paginated-response.mapper.dto';
import { ProjectHttpMapper } from 'src/application/mapper/project/project-http.mapper';
import { CreateProjectUseCase } from 'src/application/use_case/project/create-project.usecase';
import { DeleteProjectUseCase } from 'src/application/use_case/project/delete-project.usecase';
import { GetProjectUseCase } from 'src/application/use_case/project/get-project.usecase';
import { ListProjectUseCase } from 'src/application/use_case/project/list-project.usecase';
import { UpdateProjectUseCase } from 'src/application/use_case/project/update-project.usecase';

@Controller('projects')
export class ProjectControllerAdapter {
  constructor(
    private readonly createProject: CreateProjectUseCase,
    private readonly getProject: GetProjectUseCase,
    private readonly deleteProject: DeleteProjectUseCase,
    private readonly updateProject: UpdateProjectUseCase,
    private readonly listProject: ListProjectUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateProjectDto) {
    const result = await this.createProject.execute(ProjectHttpMapper.toCreateCommand(dto));
    return ProjectHttpMapper.toResponse(result);
  }

  @Get(':publicId')
  async get(@Param('publicId') publicId: string) {
    const result = await this.getProject.execute({ publicId });
    return ProjectHttpMapper.toResponse(result);
  }

  @Get()
  async list(@Query() dto: ListProjectDto) {
    const query = ProjectHttpMapper.toListQuery(dto);
    const result = await this.listProject.execute(query);
    return PaginatedResponseMapper.toPaginatedDto(result, ProjectHttpMapper.toResponse);
  }

  @Patch(':publicId')
  async update(@Param('publicId') publicId: string, @Body() dto: UpdateProjectDto) {
    const command = ProjectHttpMapper.toUpdateCommand(dto);
    const result = await this.updateProject.execute({ publicId }, command);
    return ProjectHttpMapper.toResponse(result);
  }

  @Delete(':publicId')
  async delete(@Param('publicId') publicId: string) {
    await this.deleteProject.execute({ publicId });
    return { message: 'Project deleted successfully' };
  }
}
