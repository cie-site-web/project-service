import { CreateProjectDto } from "src/application/dto/project/create-project.dto";
import { GetProjectDto } from "src/application/dto/project/get-project.dto";
import { ListProjectDto } from "src/application/dto/project/list-project.dto";
import { ResponseProjectDto } from "src/application/dto/project/response-project.dto";
import { UpdateProjectDto } from "src/application/dto/project/update-project.dto";
import { ProjectEntity } from "src/domain/entities/project.entity";
import { CreateProjectCommand } from "src/domain/port/in/project/create-project.interface.port";
import { GetProjectQuery } from "src/domain/port/in/project/get-project.interface.port";
import { ListProjectQuery } from "src/domain/port/in/project/list-project.interface.port";
import { UpdateProjectCommand } from "src/domain/port/in/project/update-project.interface.port";

export class ProjectHttpMapper {
  static toCreateCommand(dto: CreateProjectDto): CreateProjectCommand {
    return { ...dto };
  }

  static toGetQuery(dto: GetProjectDto): GetProjectQuery {
    return { publicId: dto.publicId };
  }

  static toListQuery(dto: ListProjectDto): ListProjectQuery {
    return { ...dto };
  }

  static toUpdateCommand(dto: UpdateProjectDto): UpdateProjectCommand {
    return { ...dto };
  }

  static toResponse(entity: ProjectEntity): ResponseProjectDto {
    return {
      publicId: entity.publicId,
      title: entity.title,
      description: entity.description,
      githubUrl: entity.githubUrl,
      addressUrl: entity.addressUrl,
      isPublic: entity.isPublic,
      technologiesId: entity.technologiesId,
    };
  }
}
