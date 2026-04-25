import { TagEntity } from "src/domain/entities/tag.entity";
import { ListTagQuery } from "src/domain/port/in/tag/list-tag.interface.port";

export interface TagRepositoryPort {
  save(entity: TagEntity): Promise<TagEntity>;
  findById(id: string): Promise<TagEntity | null>;
  findByPublicId(publicId: string): Promise<TagEntity | null>;
  findWithPagination(
    query: ListTagQuery,
  ): Promise<{ data: TagEntity[]; total: number }>;
  delete(publicId: string): Promise<void>;
}
