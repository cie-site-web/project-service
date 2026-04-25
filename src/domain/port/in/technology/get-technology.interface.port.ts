import { TechnologyEntity } from "src/domain/entities/technology.entity";

export interface GetTechnologyQuery {
  publicId: string;
}

export interface GetTechnologyInterfacePort {
  execute(query: GetTechnologyQuery): Promise<TechnologyEntity>;
}
