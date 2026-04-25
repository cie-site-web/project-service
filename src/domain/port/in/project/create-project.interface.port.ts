import { ProjectEntity } from "src/domain/entities/project.entity";

export interface CreateProjectCommand {
  title: string;
  description: string;
  githubUrl: string;
  addressUrl: string;
  isPublic: boolean;
  technologiesId: string;
}

export interface CreateProjectInterfacePort {
  execute(command: CreateProjectCommand): Promise<ProjectEntity>;
}
