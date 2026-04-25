import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";

export interface CreateProjectTagCommand {
  projectId: string;
  tagsId: string;
}

export interface CreateProjectTagInterfacePort {
  execute(command: CreateProjectTagCommand): Promise<ProjectTagEntity>;
}
