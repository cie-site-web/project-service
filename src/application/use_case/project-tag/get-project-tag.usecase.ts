import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";
import {
  GetProjectTagInterfacePort,
  GetProjectTagQuery,
} from "src/domain/port/in/project-tag/get-project-tag.interface.port";
import { ProjectTagRepositoryPort } from "src/domain/port/out/project-tag.repository.port";
import { GetProjectTagValidator } from "src/domain/service/validators/project-tag/get-project-tag.validator";

export class GetProjectTagUseCase implements GetProjectTagInterfacePort {
  constructor(
    private readonly repository: ProjectTagRepositoryPort,
    private readonly validator: GetProjectTagValidator,
  ) {}

  async execute(query: GetProjectTagQuery): Promise<ProjectTagEntity> {
    this.validator.validate(query);
    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) throw new ApplicationError(CodesError.PROJECT_TAG_NOT_FOUND);
    return entity;
  }
}
