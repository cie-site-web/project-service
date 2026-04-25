import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import {
  CreateProjectTagCommand,
  CreateProjectTagInterfacePort,
} from "src/domain/port/in/project-tag/create-project-tag.interface.port";
import { ProjectTagRepositoryPort } from "src/domain/port/out/project-tag.repository.port";
import { CreateProjectTagValidator } from "src/domain/service/validators/project-tag/create-project-tag.validator";

export class CreateProjectTagUseCase implements CreateProjectTagInterfacePort {
  constructor(
    private readonly repository: ProjectTagRepositoryPort,
    private readonly validator: CreateProjectTagValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateProjectTagCommand): Promise<ProjectTagEntity> {
    this.validator.validate(command);
    const publicId = this.publicIdGenerator.generateNanoid();
    const existing = await this.repository.findByPublicId(publicId);
    if (existing) throw new ApplicationError(CodesError.DUPLICATE_PROJECT_TAG);
    return this.repository.save(new ProjectTagEntity({ publicId, ...command }));
  }
}
