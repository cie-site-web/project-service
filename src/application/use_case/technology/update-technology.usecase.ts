import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TechnologyEntity } from "src/domain/entities/technology.entity";
import { GetTechnologyQuery } from "src/domain/port/in/technology/get-technology.interface.port";
import {
  UpdateTechnologyCommand,
  UpdateTechnologyInterfacePort,
} from "src/domain/port/in/technology/update-technology.interface.port";
import { TechnologyRepositoryPort } from "src/domain/port/out/technology.repository.port";
import { UpdateTechnologyValidator } from "src/domain/service/validators/technology/update-technology.validator";

export class UpdateTechnologyUseCase implements UpdateTechnologyInterfacePort {
  constructor(
    private readonly repository: TechnologyRepositoryPort,
    private readonly validator: UpdateTechnologyValidator,
  ) {}

  async execute(
    query: GetTechnologyQuery,
    command: UpdateTechnologyCommand,
  ): Promise<TechnologyEntity> {
    this.validator.validate(command);
    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) throw new ApplicationError(CodesError.TECHNOLOGY_NOT_FOUND);
    entity.update(command);
    return this.repository.save(entity);
  }
}
