import { Module } from '@nestjs/common';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';
import { TechnologyControllerAdapter } from 'src/adapter/in/technology/technology.controller.adapter';
import { TechnologyRepositoryAdapter } from 'src/adapter/out/persistence/technology.repository.adapter';
import { CreateTechnologyUseCase } from 'src/application/use_case/technology/create-technology.usecase';
import { DeleteTechnologyUseCase } from 'src/application/use_case/technology/delete-technology.usecase';
import { GetTechnologyUseCase } from 'src/application/use_case/technology/get-technology.usecase';
import { ListTechnologyUseCase } from 'src/application/use_case/technology/list-technology.usecase';
import { UpdateTechnologyUseCase } from 'src/application/use_case/technology/update-technology.usecase';
import { CreateTechnologyValidator } from 'src/domain/service/validators/technology/create-technology.validator';
import { DeleteTechnologyValidator } from 'src/domain/service/validators/technology/delete-technology.validator';
import { GetTechnologyValidator } from 'src/domain/service/validators/technology/get-technology.validator';
import { ListTechnologyValidator } from 'src/domain/service/validators/technology/list-technology.validator';
import { UpdateTechnologyValidator } from 'src/domain/service/validators/technology/update-technology.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TechnologyControllerAdapter],
  providers: [
    {
      provide: 'TechnologyRepositoryPort',
      useClass: TechnologyRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    CreateTechnologyValidator,
    GetTechnologyValidator,
    ListTechnologyValidator,
    UpdateTechnologyValidator,
    DeleteTechnologyValidator,
    {
      provide: CreateTechnologyUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreateTechnologyUseCase(repo, validator, idGenerator),
      inject: ['TechnologyRepositoryPort', CreateTechnologyValidator, 'PublicIdGeneratorPort'],
    },
    {
      provide: GetTechnologyUseCase,
      useFactory: (repo, validator) => new GetTechnologyUseCase(repo, validator),
      inject: ['TechnologyRepositoryPort', GetTechnologyValidator],
    },
    {
      provide: ListTechnologyUseCase,
      useFactory: (repo, validator) => new ListTechnologyUseCase(repo, validator),
      inject: ['TechnologyRepositoryPort', ListTechnologyValidator],
    },
    {
      provide: UpdateTechnologyUseCase,
      useFactory: (repo, validator) => new UpdateTechnologyUseCase(repo, validator),
      inject: ['TechnologyRepositoryPort', UpdateTechnologyValidator],
    },
    {
      provide: DeleteTechnologyUseCase,
      useFactory: (repo, validator) => new DeleteTechnologyUseCase(repo, validator),
      inject: ['TechnologyRepositoryPort', DeleteTechnologyValidator],
    },
  ],
  exports: [
    CreateTechnologyUseCase,
    GetTechnologyUseCase,
    ListTechnologyUseCase,
    UpdateTechnologyUseCase,
    DeleteTechnologyUseCase,
  ],
})
export class TechnologyModule {}
