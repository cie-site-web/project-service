import { TechnologyEntity } from "src/domain/entities/technology.entity";
import { GetTechnologyQuery } from "./get-technology.interface.port";

export interface UpdateTechnologyCommand {
  architectureId?: string;
  frameworkId?: string;
  utilsGestionId?: string;
}

export interface UpdateTechnologyInterfacePort {
  execute(
    query: GetTechnologyQuery,
    command: UpdateTechnologyCommand,
  ): Promise<TechnologyEntity>;
}
