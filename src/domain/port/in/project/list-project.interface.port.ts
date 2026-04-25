import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { ProjectEntity } from "src/domain/entities/project.entity";

export interface ListProjectQuery {
  page: number;
  limit: number;
  title?: string;
  isPublic?: boolean;
  technologiesId?: string;
}

export interface ListProjectInterfacePort {
  execute(query: ListProjectQuery): Promise<PaginatedResponse<ProjectEntity>>;
}
