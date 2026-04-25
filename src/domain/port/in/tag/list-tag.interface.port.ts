import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { TagEntity } from "src/domain/entities/tag.entity";

export interface ListTagQuery {
  page: number;
  limit: number;
  name?: string;
}

export interface ListTagInterfacePort {
  execute(query: ListTagQuery): Promise<PaginatedResponse<TagEntity>>;
}
