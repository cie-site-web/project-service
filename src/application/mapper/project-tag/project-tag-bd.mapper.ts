import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";

type ProjectTagPersistence = {
  id?: string;
  public_id: string;
  project_id: string;
  tags_id: string;
  created_at?: Date;
};

export class ProjectTagBdMapper {
  static toDomain(persistence: ProjectTagPersistence): ProjectTagEntity {
    return new ProjectTagEntity({
      id: persistence.id,
      publicId: persistence.public_id,
      projectId: persistence.project_id,
      tagsId: persistence.tags_id,
      createdAt: persistence.created_at,
    });
  }

  static toPersistence(entity: ProjectTagEntity) {
    return {
      public_id: entity.publicId,
      project_id: entity.projectId,
      tags_id: entity.tagsId,
    };
  }
}
