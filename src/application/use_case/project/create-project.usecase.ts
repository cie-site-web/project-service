import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ProjectEntity } from "src/domain/entities/project.entity";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import {
  CreateProjectCommand,
  CreateProjectInterfacePort,
} from "src/domain/port/in/project/create-project.interface.port";
import { ProjectRepositoryPort } from "src/domain/port/out/project.repository.port";
import { CreateProjectValidator } from "src/domain/service/validators/project/create-project.validator";

export class CreateProjectUseCase implements CreateProjectInterfacePort {
  constructor(
    private readonly repository: ProjectRepositoryPort,
    private readonly validator: CreateProjectValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateProjectCommand): Promise<ProjectEntity> {
    this.validator.validate(command);

    const publicId = this.publicIdGenerator.generateNanoid();
    const existing = await this.repository.findByPublicId(publicId);
    if (existing) throw new ApplicationError(CodesError.DUPLICATE_PROJECT);

    const entity = new ProjectEntity({ publicId, ...command });
    return this.repository.save(entity);
  }
}
