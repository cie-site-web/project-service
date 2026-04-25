import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TagEntity } from "src/domain/entities/tag.entity";
import { GetTagQuery } from "src/domain/port/in/tag/get-tag.interface.port";
import { TagRepositoryPort } from "src/domain/port/out/tag.repository.port";
import { UpdateTagCommand, UpdateTagInterfacePort } from "src/domain/port/in/tag/update-tag.interface.port";
import { UpdateTagValidator } from "src/domain/service/validators/tag/update-tag.validator";

export class UpdateTagUseCase implements UpdateTagInterfacePort {
  constructor(
    private readonly repository: TagRepositoryPort,
    private readonly validator: UpdateTagValidator,
  ) {}

  async execute(query: GetTagQuery, command: UpdateTagCommand): Promise<TagEntity> {
    this.validator.validate(command);
    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) throw new ApplicationError(CodesError.TAG_NOT_FOUND);
    entity.update(command);
    return this.repository.save(entity);
  }
}
