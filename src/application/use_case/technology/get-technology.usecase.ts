import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { TechnologyEntity } from "src/domain/entities/technology.entity";
import {
  GetTechnologyInterfacePort,
  GetTechnologyQuery,
} from "src/domain/port/in/technology/get-technology.interface.port";
import { TechnologyRepositoryPort } from "src/domain/port/out/technology.repository.port";
import { GetTechnologyValidator } from "src/domain/service/validators/technology/get-technology.validator";

export class GetTechnologyUseCase implements GetTechnologyInterfacePort {
  constructor(
    private readonly repository: TechnologyRepositoryPort,
    private readonly validator: GetTechnologyValidator,
  ) {}

  async execute(query: GetTechnologyQuery): Promise<TechnologyEntity> {
    this.validator.validate(query);
    const entity = await this.repository.findByPublicId(query.publicId);
    if (!entity) throw new ApplicationError(CodesError.TECHNOLOGY_NOT_FOUND);
    return entity;
  }
}
