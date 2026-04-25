import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";
import { GetProjectTagQuery } from "src/domain/port/in/project-tag/get-project-tag.interface.port";
import { UpdateProjectTagCommand, UpdateProjectTagInterfacePort } from "src/domain/port/in/project-tag/update-project-tag.interface.port";
import { ProjectTagRepositoryPort } from "src/domain/port/out/project-tag.repository.port";
import { UpdateProjectTagValidator } from "src/domain/service/validators/project-tag/update-project-tag.validator";

export class UpdateProjectTagUseCase implements UpdateProjectTagInterfacePort {
  constructor(
    private readonly repository: ProjectTagRepositoryPort,
    private readonly validator: UpdateProjectTagValidator,
  ) {}

  async execute(query: GetProjectTagQuery, command: UpdateProjectTagCommand): Promise<ProjectTagEntity> {
    this.validator.validate(command);
    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) throw new ApplicationError(CodesError.PROJECT_TAG_NOT_FOUND);
    entity.update(command);
    return this.repository.save(entity);
  }
}
