import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import {
  DeleteProjectCommand,
  DeleteProjectInterfacePort,
} from "src/domain/port/in/project/delete-project.interface.port";
import { ProjectRepositoryPort } from "src/domain/port/out/project.repository.port";
import { DeleteProjectValidator } from "src/domain/service/validators/project/delete-project.validator";

export class DeleteProjectUseCase implements DeleteProjectInterfacePort {
  constructor(
    private readonly repository: ProjectRepositoryPort,
    private readonly validator: DeleteProjectValidator,
  ) {}

  async execute(command: DeleteProjectCommand): Promise<void> {
    this.validator.validate(command);
    const entity = await this.repository.findByPublicId(command.publicId);
    if (!entity) throw new ApplicationError(CodesError.PROJECT_NOT_FOUND);
    await this.repository.delete(command.publicId);
  }
}
