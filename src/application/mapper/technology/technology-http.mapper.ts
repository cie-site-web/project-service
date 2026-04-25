import { CreateTechnologyDto } from "src/application/dto/technology/create-technology.dto";
import { GetTechnologyDto } from "src/application/dto/technology/get-technology.dto";
import { ListTechnologyDto } from "src/application/dto/technology/list-technology.dto";
import { ResponseTechnologyDto } from "src/application/dto/technology/response-technology.dto";
import { UpdateTechnologyDto } from "src/application/dto/technology/update-technology.dto";
import { TechnologyEntity } from "src/domain/entities/technology.entity";
import { CreateTechnologyCommand } from "src/domain/port/in/technology/create-technology.interface.port";
import { GetTechnologyQuery } from "src/domain/port/in/technology/get-technology.interface.port";
import { ListTechnologyQuery } from "src/domain/port/in/technology/list-technology.interface.port";
import { UpdateTechnologyCommand } from "src/domain/port/in/technology/update-technology.interface.port";

export class TechnologyHttpMapper {
  static toCreateCommand(dto: CreateTechnologyDto): CreateTechnologyCommand {
    return { ...dto };
  }
  static toGetQuery(dto: GetTechnologyDto): GetTechnologyQuery {
    return { publicId: dto.publicId };
  }
  static toListQuery(dto: ListTechnologyDto): ListTechnologyQuery {
    return { ...dto };
  }
  static toUpdateCommand(dto: UpdateTechnologyDto): UpdateTechnologyCommand {
    return { ...dto };
  }
  static toResponse(entity: TechnologyEntity): ResponseTechnologyDto {
    return {
      publicId: entity.publicId,
      architectureId: entity.architectureId,
      frameworkId: entity.frameworkId,
      utilsGestionId: entity.utilsGestionId,
    };
  }
}
