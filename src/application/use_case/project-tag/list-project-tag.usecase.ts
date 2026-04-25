import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";
import { ListProjectTagInterfacePort, ListProjectTagQuery } from "src/domain/port/in/project-tag/list-project-tag.interface.port";
import { ProjectTagRepositoryPort } from "src/domain/port/out/project-tag.repository.port";
import { ListProjectTagValidator } from "src/domain/service/validators/project-tag/list-project-tag.validator";

export class ListProjectTagUseCase implements ListProjectTagInterfacePort {
  constructor(
    private readonly repository: ProjectTagRepositoryPort,
    private readonly validator: ListProjectTagValidator,
  ) {}

  async execute(query: ListProjectTagQuery): Promise<PaginatedResponse<ProjectTagEntity>> {
    this.validator.validate(query);
    const { data, total } = await this.repository.findWithPagination(query);
    const totalPages = Math.ceil(total / query.limit);
    return { data, total, page: query.page, limit: query.limit, totalPages };
  }
}
