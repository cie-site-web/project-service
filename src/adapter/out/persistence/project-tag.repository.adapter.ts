import { Injectable } from '@nestjs/common';
import { ProjectTagBdMapper } from 'src/application/mapper/project-tag/project-tag-bd.mapper';
import { ProjectTagEntity } from 'src/domain/entities/project-tag.entity';
import { ListProjectTagQuery } from 'src/domain/port/in/project-tag/list-project-tag.interface.port';
import { ProjectTagRepositoryPort } from 'src/domain/port/out/project-tag.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class ProjectTagRepositoryAdapter implements ProjectTagRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: ProjectTagEntity): Promise<ProjectTagEntity> {
    const data = ProjectTagBdMapper.toPersistence(entity);
    const saved = await this.prisma.projectTagTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });
    return ProjectTagBdMapper.toDomain(saved);
  }

  async findById(id: string): Promise<ProjectTagEntity | null> {
    const entity = await this.prisma.projectTagTable.findUnique({ where: { id } });
    return entity ? ProjectTagBdMapper.toDomain(entity) : null;
  }

  async findByPublicId(publicId: string): Promise<ProjectTagEntity | null> {
    const entity = await this.prisma.projectTagTable.findUnique({
      where: { public_id: publicId },
    });
    return entity ? ProjectTagBdMapper.toDomain(entity) : null;
  }

  async findWithPagination(
    query: ListProjectTagQuery,
  ): Promise<{ data: ProjectTagEntity[]; total: number }> {
    const { page, limit, projectId, tagsId } = query;
    const where: Record<string, unknown> = {};
    if (projectId) where.project_id = projectId;
    if (tagsId) where.tags_id = tagsId;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.projectTagTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.projectTagTable.count({ where }),
    ]);

    return { data: data.map(ProjectTagBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.projectTagTable.delete({ where: { public_id: publicId } });
  }
}
