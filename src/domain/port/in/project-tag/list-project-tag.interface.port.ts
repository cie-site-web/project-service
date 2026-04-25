import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";

export interface ListProjectTagQuery {
  page: number;
  limit: number;
  projectId?: string;
  tagsId?: string;
}

export interface ListProjectTagInterfacePort {
  execute(query: ListProjectTagQuery): Promise<PaginatedResponse<ProjectTagEntity>>;
}
