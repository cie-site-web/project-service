import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ProjectEntity } from "src/domain/entities/project.entity";
import { GetProjectQuery } from "src/domain/port/in/project/get-project.interface.port";
import {
  UpdateProjectCommand,
  UpdateProjectInterfacePort,
} from "src/domain/port/in/project/update-project.interface.port";
import { ProjectRepositoryPort } from "src/domain/port/out/project.repository.port";
import { UpdateProjectValidator } from "src/domain/service/validators/project/update-project.validator";

export class UpdateProjectUseCase implements UpdateProjectInterfacePort {
  constructor(
    private readonly repository: ProjectRepositoryPort,
    private readonly validator: UpdateProjectValidator,
  ) {}

  async execute(query: GetProjectQuery, command: UpdateProjectCommand): Promise<ProjectEntity> {
    this.validator.validate(command);
    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) throw new ApplicationError(CodesError.PROJECT_NOT_FOUND);
    entity.update(command);
    return this.repository.save(entity);
  }
}
