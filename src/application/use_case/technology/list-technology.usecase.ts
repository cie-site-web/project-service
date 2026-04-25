import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { TechnologyEntity } from "src/domain/entities/technology.entity";
import {
  ListTechnologyInterfacePort,
  ListTechnologyQuery,
} from "src/domain/port/in/technology/list-technology.interface.port";
import { TechnologyRepositoryPort } from "src/domain/port/out/technology.repository.port";
import { ListTechnologyValidator } from "src/domain/service/validators/technology/list-technology.validator";

export class ListTechnologyUseCase implements ListTechnologyInterfacePort {
  constructor(
    private readonly repository: TechnologyRepositoryPort,
    private readonly validator: ListTechnologyValidator,
  ) {}

  async execute(query: ListTechnologyQuery): Promise<PaginatedResponse<TechnologyEntity>> {
    this.validator.validate(query);
    const { data, total } = await this.repository.findWithPagination(query);
    const totalPages = Math.ceil(total / query.limit);
    return { data, total, page: query.page, limit: query.limit, totalPages };
  }
}
