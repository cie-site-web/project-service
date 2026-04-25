import { Module } from '@nestjs/common';
import { PublicIdGeneratorAdapter } from 'src/adapter/in/generate-public-id/generate.public-id.adapter';
import { TagControllerAdapter } from 'src/adapter/in/tag/tag.controller.adapter';
import { TagRepositoryAdapter } from 'src/adapter/out/persistence/tag.repository.adapter';
import { CreateTagUseCase } from 'src/application/use_case/tag/create-tag.usecase';
import { DeleteTagUseCase } from 'src/application/use_case/tag/delete-tag.usecase';
import { GetTagUseCase } from 'src/application/use_case/tag/get-tag.usecase';
import { ListTagUseCase } from 'src/application/use_case/tag/list-tag.usecase';
import { UpdateTagUseCase } from 'src/application/use_case/tag/update-tag.usecase';
import { CreateTagValidator } from 'src/domain/service/validators/tag/create-tag.validator';
import { DeleteTagValidator } from 'src/domain/service/validators/tag/delete-tag.validator';
import { GetTagValidator } from 'src/domain/service/validators/tag/get-tag.validator';
import { ListTagValidator } from 'src/domain/service/validators/tag/list-tag.validator';
import { UpdateTagValidator } from 'src/domain/service/validators/tag/update-tag.validator';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TagControllerAdapter],
  providers: [
    {
      provide: 'TagRepositoryPort',
      useClass: TagRepositoryAdapter,
    },
    {
      provide: 'PublicIdGeneratorPort',
      useClass: PublicIdGeneratorAdapter,
    },
    CreateTagValidator,
    GetTagValidator,
    ListTagValidator,
    UpdateTagValidator,
    DeleteTagValidator,
    {
      provide: CreateTagUseCase,
      useFactory: (repo, validator, idGenerator) =>
        new CreateTagUseCase(repo, validator, idGenerator),
      inject: ['TagRepositoryPort', CreateTagValidator, 'PublicIdGeneratorPort'],
    },
    {
      provide: GetTagUseCase,
      useFactory: (repo, validator) => new GetTagUseCase(repo, validator),
      inject: ['TagRepositoryPort', GetTagValidator],
    },
    {
      provide: ListTagUseCase,
      useFactory: (repo, validator) => new ListTagUseCase(repo, validator),
      inject: ['TagRepositoryPort', ListTagValidator],
    },
    {
      provide: UpdateTagUseCase,
      useFactory: (repo, validator) => new UpdateTagUseCase(repo, validator),
      inject: ['TagRepositoryPort', UpdateTagValidator],
    },
    {
      provide: DeleteTagUseCase,
      useFactory: (repo, validator) => new DeleteTagUseCase(repo, validator),
      inject: ['TagRepositoryPort', DeleteTagValidator],
    },
  ],
  exports: [
    CreateTagUseCase,
    GetTagUseCase,
    ListTagUseCase,
    UpdateTagUseCase,
    DeleteTagUseCase,
  ],
})
export class TagModule {}
