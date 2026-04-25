import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TagEntity } from "src/domain/entities/tag.entity";
import { GetTagInterfacePort, GetTagQuery } from "src/domain/port/in/tag/get-tag.interface.port";
import { TagRepositoryPort } from "src/domain/port/out/tag.repository.port";
import { GetTagValidator } from "src/domain/service/validators/tag/get-tag.validator";

export class GetTagUseCase implements GetTagInterfacePort {
  constructor(
    private readonly repository: TagRepositoryPort,
    private readonly validator: GetTagValidator,
  ) {}

  async execute(query: GetTagQuery): Promise<TagEntity> {
    this.validator.validate(query);
    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) throw new ApplicationError(CodesError.TAG_NOT_FOUND);
    return entity;
  }
}
