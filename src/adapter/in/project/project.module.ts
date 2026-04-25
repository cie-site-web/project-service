import { Module } from '@nestjs/common';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';
import { ProjectControllerAdapter } from 'src/adapter/in/project/project.controller.adapter';
import { ProjectRepositoryAdapter } from 'src/adapter/out/persistence/project.repository.adapter';
import { CreateProjectUseCase } from 'src/application/use_case/project/create-project.usecase';
import { DeleteProjectUseCase } from 'src/application/use_case/project/delete-project.usecase';
import { GetProjectUseCase } from 'src/application/use_case/project/get-project.usecase';
import { ListProjectUseCase } from 'src/application/use_case/project/list-project.usecase';
import { UpdateProjectUseCase } from 'src/application/use_case/project/update-project.usecase';
import { CreateProjectValidator } from 'src/domain/service/validators/project/create-project.validator';
import { DeleteProjectValidator } from 'src/domain/service/validators/project/delete-project.validator';
import { GetProjectValidator } from 'src/domain/service/validators/project/get-project.validator';
import { ListProjectValidator } from 'src/domain/service/validators/project/list-project.validator';
import { UpdateProjectValidator } from 'src/domain/service/validators/project/update-project.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectControllerAdapter],
  providers: [
    {
      provide: 'ProjectRepositoryPort',
      useClass: ProjectRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    CreateProjectValidator,
    GetProjectValidator,
    ListProjectValidator,
    UpdateProjectValidator,
    DeleteProjectValidator,
    {
      provide: CreateProjectUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreateProjectUseCase(repo, validator, idGenerator),
      inject: ['ProjectRepositoryPort', CreateProjectValidator, 'PublicIdGeneratorPort'],
    },
    {
      provide: GetProjectUseCase,
      useFactory: (repo, validator) => new GetProjectUseCase(repo, validator),
      inject: ['ProjectRepositoryPort', GetProjectValidator],
    },
    {
      provide: ListProjectUseCase,
      useFactory: (repo, validator) => new ListProjectUseCase(repo, validator),
      inject: ['ProjectRepositoryPort', ListProjectValidator],
    },
    {
      provide: UpdateProjectUseCase,
      useFactory: (repo, validator) => new UpdateProjectUseCase(repo, validator),
      inject: ['ProjectRepositoryPort', UpdateProjectValidator],
    },
    {
      provide: DeleteProjectUseCase,
      useFactory: (repo, validator) => new DeleteProjectUseCase(repo, validator),
      inject: ['ProjectRepositoryPort', DeleteProjectValidator],
    },
  ],
  exports: [
    CreateProjectUseCase,
    GetProjectUseCase,
    ListProjectUseCase,
    UpdateProjectUseCase,
    DeleteProjectUseCase,
  ],
})
export class ProjectModule {}
