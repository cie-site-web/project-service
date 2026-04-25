import { CreateTagDto } from "src/application/dto/tag/create-tag.dto";
import { GetTagDto } from "src/application/dto/tag/get-tag.dto";
import { ListTagDto } from "src/application/dto/tag/list-tag.dto";
import { ResponseTagDto } from "src/application/dto/tag/response-tag.dto";
import { UpdateTagDto } from "src/application/dto/tag/update-tag.dto";
import { TagEntity } from "src/domain/entities/tag.entity";
import { CreateTagCommand } from "src/domain/port/in/tag/create-tag.interface.port";
import { GetTagQuery } from "src/domain/port/in/tag/get-tag.interface.port";
import { ListTagQuery } from "src/domain/port/in/tag/list-tag.interface.port";
import { UpdateTagCommand } from "src/domain/port/in/tag/update-tag.interface.port";

export class TagHttpMapper {
  static toCreateCommand(dto: CreateTagDto): CreateTagCommand {
    return { ...dto };
  }
  static toGetQuery(dto: GetTagDto): GetTagQuery {
    return { publicId: dto.publicId };
  }
  static toListQuery(dto: ListTagDto): ListTagQuery {
    return { ...dto };
  }
  static toUpdateCommand(dto: UpdateTagDto): UpdateTagCommand {
    return { ...dto };
  }
  static toResponse(entity: TagEntity): ResponseTagDto {
    return {
      publicId: entity.publicId,
      name: entity.name,
      description: entity.description,
    };
  }
}
