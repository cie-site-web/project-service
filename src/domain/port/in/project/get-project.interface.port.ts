import { ProjectEntity } from "src/domain/entities/project.entity";

export interface GetProjectQuery {
  publicId: string;
}

export interface GetProjectInterfacePort {
  execute(query: GetProjectQuery): Promise<ProjectEntity>;
}
