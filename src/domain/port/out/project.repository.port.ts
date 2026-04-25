import { ProjectEntity } from "src/domain/entities/project.entity";
import { ListProjectQuery } from "src/domain/port/in/project/list-project.interface.port";

export interface ProjectRepositoryPort {
  save(entity: ProjectEntity): Promise<ProjectEntity>;
  findById(id: string): Promise<ProjectEntity | null>;
  findByPublicId(publicId: string): Promise<ProjectEntity | null>;
  findWithPagination(
    query: ListProjectQuery,
  ): Promise<{ data: ProjectEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
}
