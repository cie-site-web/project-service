import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import {
  DeleteTechnologyCommand,
  DeleteTechnologyInterfacePort,
} from "src/domain/port/in/technology/delete-technology.interface.port";
import { TechnologyRepositoryPort } from "src/domain/port/out/technology.repository.port";
import { DeleteTechnologyValidator } from "src/domain/service/validators/technology/delete-technology.validator";

export class DeleteTechnologyUseCase implements DeleteTechnologyInterfacePort {
  constructor(
    private readonly repository: TechnologyRepositoryPort,
    private readonly validator: DeleteTechnologyValidator,
  ) {}

  async execute(command: DeleteTechnologyCommand): Promise<void> {
    this.validator.validate(command);
    const entity = await this.repository.findByPublicId(command.publicId);
    if (!entity) throw new ApplicationError(CodesError.TECHNOLOGY_NOT_FOUND);
    await this.repository.delete(command.publicId);
  }
}
