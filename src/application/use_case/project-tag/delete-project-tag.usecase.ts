import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { DeleteProjectTagCommand, DeleteProjectTagInterfacePort } from "src/domain/port/in/project-tag/delete-project-tag.interface.port";
import { ProjectTagRepositoryPort } from "src/domain/port/out/project-tag.repository.port";
import { DeleteProjectTagValidator } from "src/domain/service/validators/project-tag/delete-project-tag.validator";

export class DeleteProjectTagUseCase implements DeleteProjectTagInterfacePort {
  constructor(
    private readonly repository: ProjectTagRepositoryPort,
    private readonly validator: DeleteProjectTagValidator,
  ) {}

  async execute(command: DeleteProjectTagCommand): Promise<void> {
    this.validator.validate(command);
    const entity = await this.repository.findByPublicId(command.publicId);
    if (!entity) throw new ApplicationError(CodesError.PROJECT_TAG_NOT_FOUND);
    await this.repository.delete(command.publicId);
  }
}
