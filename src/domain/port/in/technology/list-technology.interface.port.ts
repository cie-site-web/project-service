import { PaginatedResponse } from "src/domain/entities/paginated-response.entity";
import { TechnologyEntity } from "src/domain/entities/technology.entity";

export interface ListTechnologyQuery {
  page: number;
  limit: number;
  architectureId?: string;
  frameworkId?: string;
  utilsGestionId?: string;
}

export interface ListTechnologyInterfacePort {
  execute(query: ListTechnologyQuery): Promise<PaginatedResponse<TechnologyEntity>>;
}
