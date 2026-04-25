import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";

export interface GetProjectTagQuery {
  publicId: string;
}

export interface GetProjectTagInterfacePort {
  execute(query: GetProjectTagQuery): Promise<ProjectTagEntity>;
}
