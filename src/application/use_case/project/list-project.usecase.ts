import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { ProjectEntity } from "src/domain/entities/project.entity";
import {
  ListProjectInterfacePort,
  ListProjectQuery,
} from "src/domain/port/in/project/list-project.interface.port";
import { ProjectRepositoryPort } from "src/domain/port/out/project.repository.port";
import { ListProjectValidator } from "src/domain/service/validators/project/list-project.validator";

export class ListProjectUseCase implements ListProjectInterfacePort {
  constructor(
    private readonly repository: ProjectRepositoryPort,
    private readonly validator: ListProjectValidator,
  ) {}

  async execute(query: ListProjectQuery): Promise<PaginatedResponse<ProjectEntity>> {
    this.validator.validate(query);
    const { data, total } = await this.repository.findWithPagination(query);
    const totalPages = Math.ceil(total / query.limit);
    return { data, total, page: query.page, limit: query.limit, totalPages };
  }
}
