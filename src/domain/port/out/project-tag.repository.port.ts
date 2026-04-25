import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";
import { ListProjectTagQuery } from "src/domain/port/in/project-tag/list-project-tag.interface.port";

export interface ProjectTagRepositoryPort {
  save(entity: ProjectTagEntity): Promise<ProjectTagEntity>;
  findById(id: string): Promise<ProjectTagEntity | null>;
  findByPublicId(publicId: string): Promise<ProjectTagEntity | null>;
  findWithPagination(
    query: ListProjectTagQuery,
  ): Promise<{ data: ProjectTagEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
}
