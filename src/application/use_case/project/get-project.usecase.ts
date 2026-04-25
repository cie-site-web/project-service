import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ProjectEntity } from "src/domain/entities/project.entity";
import {
  GetProjectInterfacePort,
  GetProjectQuery,
} from "src/domain/port/in/project/get-project.interface.port";
import { ProjectRepositoryPort } from "src/domain/port/out/project.repository.port";
import { GetProjectValidator } from "src/domain/service/validators/project/get-project.validator";

export class GetProjectUseCase implements GetProjectInterfacePort {
  constructor(
    private readonly repository: ProjectRepositoryPort,
    private readonly validator: GetProjectValidator,
  ) {}

  async execute(query: GetProjectQuery): Promise<ProjectEntity> {
    this.validator.validate(query);
    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) throw new ApplicationError(CodesError.PROJECT_NOT_FOUND);
    return entity;
  }
}
