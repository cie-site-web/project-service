import { ProjectEntity } from "src/domain/entities/project.entity";
import { GetProjectQuery } from "./get-project.interface.port";

export interface UpdateProjectCommand {
  title?: string;
  description?: string;
  githubUrl?: string;
  addressUrl?: string;
  isPublic?: boolean;
  technologiesId?: string;
}

export interface UpdateProjectInterfacePort {
  execute(query: GetProjectQuery, command: UpdateProjectCommand): Promise<ProjectEntity>;
}
