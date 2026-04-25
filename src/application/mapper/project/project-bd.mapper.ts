import { ProjectEntity } from "src/domain/entities/project.entity";

type ProjectPersistence = {
  id?: string;
  public_id: string;
  title: string;
  description: string;
  github_url: string;
  address_url: string;
  is_public: boolean;
  technologies_id: string;
  created_at?: Date;
};

export class ProjectBdMapper {
  static toDomain(persistence: ProjectPersistence): ProjectEntity {
    return new ProjectEntity({
      id: persistence.id,
      publicId: persistence.public_id,
      title: persistence.title,
      description: persistence.description,
      githubUrl: persistence.github_url,
      addressUrl: persistence.address_url,
      isPublic: persistence.is_public,
      technologiesId: persistence.technologies_id,
      createdAt: persistence.created_at,
    });
  }

  static toPersistence(entity: ProjectEntity) {
    return {
      public_id: entity.publicId,
      title: entity.title,
      description: entity.description,
      github_url: entity.githubUrl,
      address_url: entity.addressUrl,
      is_public: entity.isPublic,
      technologies_id: entity.technologiesId,
    };
  }
}
