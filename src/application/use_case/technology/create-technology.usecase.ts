import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TechnologyEntity } from "src/domain/entities/technology.entity";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import {
  CreateTechnologyCommand,
  CreateTechnologyInterfacePort,
} from "src/domain/port/in/technology/create-technology.interface.port";
import { TechnologyRepositoryPort } from "src/domain/port/out/technology.repository.port";
import { CreateTechnologyValidator } from "src/domain/service/validators/technology/create-technology.validator";

export class CreateTechnologyUseCase implements CreateTechnologyInterfacePort {
  constructor(
    private readonly repository: TechnologyRepositoryPort,
    private readonly validator: CreateTechnologyValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateTechnologyCommand): Promise<TechnologyEntity> {
    this.validator.validate(command);
    const publicId = this.publicIdGenerator.generateNanoid();
    const existing = await this.repository.findByPublicId(publicId);
    if (existing) throw new ApplicationError(CodesError.DUPLICATE_TECHNOLOGY);
    return this.repository.save(new TechnologyEntity({ publicId, ...command }));
  }
}
