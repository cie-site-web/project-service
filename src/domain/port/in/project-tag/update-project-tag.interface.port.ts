import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";
import { GetProjectTagQuery } from "./get-project-tag.interface.port";

export interface UpdateProjectTagCommand {
  projectId?: string;
  tagsId?: string;
}

export interface UpdateProjectTagInterfacePort {
  execute(
    query: GetProjectTagQuery,
    command: UpdateProjectTagCommand,
  ): Promise<ProjectTagEntity>;
}
