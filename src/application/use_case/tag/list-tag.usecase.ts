import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { TagEntity } from "src/domain/entities/tag.entity";
import { ListTagInterfacePort, ListTagQuery } from "src/domain/port/in/tag/list-tag.interface.port";
import { TagRepositoryPort } from "src/domain/port/out/tag.repository.port";
import { ListTagValidator } from "src/domain/service/validators/tag/list-tag.validator";

export class ListTagUseCase implements ListTagInterfacePort {
  constructor(
    private readonly repository: TagRepositoryPort,
    private readonly validator: ListTagValidator,
  ) {}

  async execute(query: ListTagQuery): Promise<PaginatedResponse<TagEntity>> {
    this.validator.validate(query);
    const { data, total } = await this.repository.findWithPagination(query);
    const totalPages = Math.ceil(total / query.limit);
    return { data, total, page: query.page, limit: query.limit, totalPages };
  }
}
