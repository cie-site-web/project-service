import { CreateProjectTagDto } from "src/application/dto/project-tag/create-project-tag.dto";
import { GetProjectTagDto } from "src/application/dto/project-tag/get-project-tag.dto";
import { ListProjectTagDto } from "src/application/dto/project-tag/list-project-tag.dto";
import { ResponseProjectTagDto } from "src/application/dto/project-tag/response-project-tag.dto";
import { UpdateProjectTagDto } from "src/application/dto/project-tag/update-project-tag.dto";
import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";
import { CreateProjectTagCommand } from "src/domain/port/in/project-tag/create-project-tag.interface.port";
import { GetProjectTagQuery } from "src/domain/port/in/project-tag/get-project-tag.interface.port";
import { ListProjectTagQuery } from "src/domain/port/in/project-tag/list-project-tag.interface.port";
import { UpdateProjectTagCommand } from "src/domain/port/in/project-tag/update-project-tag.interface.port";

export class ProjectTagHttpMapper {
  static toCreateCommand(dto: CreateProjectTagDto): CreateProjectTagCommand {
    return { ...dto };
  }
  static toGetQuery(dto: GetProjectTagDto): GetProjectTagQuery {
    return { publicId: dto.publicId };
  }
  static toListQuery(dto: ListProjectTagDto): ListProjectTagQuery {
    return { ...dto };
  }
  static toUpdateCommand(dto: UpdateProjectTagDto): UpdateProjectTagCommand {
    return { ...dto };
  }
  static toResponse(entity: ProjectTagEntity): ResponseProjectTagDto {
    return {
      publicId: entity.publicId,
      projectId: entity.projectId,
      tagsId: entity.tagsId,
    };
  }
}
