import { TagEntity } from "src/domain/entities/tag.entity";

export interface GetTagQuery {
  publicId: string;
}

export interface GetTagInterfacePort {
  execute(query: GetTagQuery): Promise<TagEntity>;
}
