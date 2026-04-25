import { TagEntity } from "src/domain/entities/tag.entity";

type TagPersistence = {
  id?: string;
  public_id: string;
  name: string;
  description: string;
  created_at?: Date;
};

export class TagBdMapper {
  static toDomain(persistence: TagPersistence): TagEntity {
    return new TagEntity({
      id: persistence.id,
      publicId: persistence.public_id,
      name: persistence.name,
      description: persistence.description,
      createdAt: persistence.created_at,
    });
  }

  static toPersistence(entity: TagEntity) {
    return {
      public_id: entity.publicId,
      name: entity.name,
      description: entity.description,
    };
  }
}
