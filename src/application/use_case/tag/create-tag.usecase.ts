import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TagEntity } from "src/domain/entities/tag.entity";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { CreateTagCommand, CreateTagInterfacePort } from "src/domain/port/in/tag/create-tag.interface.port";
import { TagRepositoryPort } from "src/domain/port/out/tag.repository.port";
import { CreateTagValidator } from "src/domain/service/validators/tag/create-tag.validator";

export class CreateTagUseCase implements CreateTagInterfacePort {
  constructor(
    private readonly repository: TagRepositoryPort,
    private readonly validator: CreateTagValidator,
    private readonly publicIdGenerator: PublicIdGeneratorPort,
  ) {}

  async execute(command: CreateTagCommand): Promise<TagEntity> {
    this.validator.validate(command);
    const publicId = this.publicIdGenerator.generateNanoid();
    const existing = await this.repository.findByPublicId(publicId);
    if (existing) throw new ApplicationError(CodesError.DUPLICATE_TAG);
    return this.repository.save(new TagEntity({ publicId, ...command }));
  }
}
