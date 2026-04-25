import { TechnologyEntity } from "src/domain/entities/technology.entity";

export interface CreateTechnologyCommand {
  architectureId: string;
  frameworkId: string;
  utilsGestionId: string;
}

export interface CreateTechnologyInterfacePort {
  execute(command: CreateTechnologyCommand): Promise<TechnologyEntity>;
}
