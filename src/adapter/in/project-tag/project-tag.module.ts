import { Module } from '@nestjs/common';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';
import { ProjectTagControllerAdapter } from 'src/adapter/in/project-tag/project-tag.controller.adapter';
import { ProjectTagRepositoryAdapter } from 'src/adapter/out/persistence/project-tag.repository.adapter';
import { CreateProjectTagUseCase } from 'src/application/use_case/project-tag/create-project-tag.usecase';
import { DeleteProjectTagUseCase } from 'src/application/use_case/project-tag/delete-project-tag.usecase';
import { GetProjectTagUseCase } from 'src/application/use_case/project-tag/get-project-tag.usecase';
import { ListProjectTagUseCase } from 'src/application/use_case/project-tag/list-project-tag.usecase';
import { UpdateProjectTagUseCase } from 'src/application/use_case/project-tag/update-project-tag.usecase';
import { CreateProjectTagValidator } from 'src/domain/service/validators/project-tag/create-project-tag.validator';
import { DeleteProjectTagValidator } from 'src/domain/service/validators/project-tag/delete-project-tag.validator';
import { GetProjectTagValidator } from 'src/domain/service/validators/project-tag/get-project-tag.validator';
import { ListProjectTagValidator } from 'src/domain/service/validators/project-tag/list-project-tag.validator';
import { UpdateProjectTagValidator } from 'src/domain/service/validators/project-tag/update-project-tag.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectTagControllerAdapter],
  providers: [
    {
      provide: 'ProjectTagRepositoryPort',
      useClass: ProjectTagRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    CreateProjectTagValidator,
    GetProjectTagValidator,
    ListProjectTagValidator,
    UpdateProjectTagValidator,
    DeleteProjectTagValidator,
    {
      provide: CreateProjectTagUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreateProjectTagUseCase(repo, validator, idGenerator),
      inject: ['ProjectTagRepositoryPort', CreateProjectTagValidator, 'PublicIdGeneratorPort'],
    },
    {
      provide: GetProjectTagUseCase,
      useFactory: (repo, validator) => new GetProjectTagUseCase(repo, validator),
      inject: ['ProjectTagRepositoryPort', GetProjectTagValidator],
    },
    {
      provide: ListProjectTagUseCase,
      useFactory: (repo, validator) => new ListProjectTagUseCase(repo, validator),
      inject: ['ProjectTagRepositoryPort', ListProjectTagValidator],
    },
    {
      provide: UpdateProjectTagUseCase,
      useFactory: (repo, validator) => new UpdateProjectTagUseCase(repo, validator),
      inject: ['ProjectTagRepositoryPort', UpdateProjectTagValidator],
    },
    {
      provide: DeleteProjectTagUseCase,
      useFactory: (repo, validator) => new DeleteProjectTagUseCase(repo, validator),
      inject: ['ProjectTagRepositoryPort', DeleteProjectTagValidator],
    },
  ],
  exports: [
    CreateProjectTagUseCase,
    GetProjectTagUseCase,
    ListProjectTagUseCase,
    UpdateProjectTagUseCase,
    DeleteProjectTagUseCase,
  ],
})
export class ProjectTagModule {}
