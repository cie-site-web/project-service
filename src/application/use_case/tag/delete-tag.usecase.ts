import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeleteTagCommand, DeleteTagInterfacePort } from "src/domain/port/in/tag/delete-tag.interface.port";
import { TagRepositoryPort } from "src/domain/port/out/tag.repository.port";
import { DeleteTagValidator } from "src/domain/service/validators/tag/delete-tag.validator";

export class DeleteTagUseCase implements DeleteTagInterfacePort {
  constructor(
    private readonly repository: TagRepositoryPort,
    private readonly validator: DeleteTagValidator,
  ) {}

  async execute(command: DeleteTagCommand): Promise<void> {
    this.validator.validate(command);
    const entity = await this.repository.findByPublicId(command.publicId);
    if (!entity) throw new ApplicationError(CodesError.TAG_NOT_FOUND);
    await this.repository.delete(command.publicId);
  }
}
