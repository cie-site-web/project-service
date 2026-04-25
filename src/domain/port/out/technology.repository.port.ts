import { TechnologyEntity } from "src/domain/entities/technology.entity";
import { ListTechnologyQuery } from "src/domain/port/in/technology/list-technology.interface.port";

export interface TechnologyRepositoryPort {
  save(entity: TechnologyEntity): Promise<TechnologyEntity>;
  findById(id: string): Promise<TechnologyEntity | null>;
  findByPublicId(publicId: string): Promise<TechnologyEntity | null>;
  findWithPagination(
    query: ListTechnologyQuery,
  ): Promise<{ data: TechnologyEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
}
