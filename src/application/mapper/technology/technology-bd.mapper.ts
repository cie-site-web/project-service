import { TechnologyEntity } from "src/domain/entities/technology.entity";

type TechnologyPersistence = {
  id?: string;
  public_id: string;
  architecture_id: string;
  framework_id: string;
  utils_gestion_id: string;
  created_at?: Date;
};

export class TechnologyBdMapper {
  static toDomain(persistence: TechnologyPersistence): TechnologyEntity {
    return new TechnologyEntity({
      id: persistence.id,
      publicId: persistence.public_id,
      architectureId: persistence.architecture_id,
      frameworkId: persistence.framework_id,
      utilsGestionId: persistence.utils_gestion_id,
      createdAt: persistence.created_at,
    });
  }

  static toPersistence(entity: TechnologyEntity) {
    return {
      public_id: entity.publicId,
      architecture_id: entity.architectureId,
      framework_id: entity.frameworkId,
      utils_gestion_id: entity.utilsGestionId,
    };
  }
}
