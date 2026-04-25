import { Injectable } from '@nestjs/common';
import { ProjectBdMapper } from 'src/application/mapper/project/project-bd.mapper';
import { ProjectEntity } from 'src/domain/entities/project.entity';
import { ListProjectQuery } from 'src/domain/port/in/project/list-project.interface.port';
import { ProjectRepositoryPort } from 'src/domain/port/out/project.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class ProjectRepositoryAdapter implements ProjectRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: ProjectEntity): Promise<ProjectEntity> {
    const data = ProjectBdMapper.toPersistence(entity);
    const saved = await this.prisma.projectTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });
    return ProjectBdMapper.toDomain(saved);
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    const entity = await this.prisma.projectTable.findUnique({ where: { id } });
    return entity ? ProjectBdMapper.toDomain(entity) : null;
  }

  async findByPublicId(publicId: string): Promise<ProjectEntity | null> {
    const entity = await this.prisma.projectTable.findUnique({
      where: { public_id: publicId },
    });
    return entity ? ProjectBdMapper.toDomain(entity) : null;
  }

  async findWithPagination(
    query: ListProjectQuery,
  ): Promise<{ data: ProjectEntity[]; total: number }> {
    const { page, limit, title, isPublic, technologiesId } = query;
    const where: Record<string, unknown> = {};

    if (title) where.title = { contains: title, mode: 'insensitive' };
    if (isPublic !== undefined) where.is_public = isPublic;
    if (technologiesId) where.technologies_id = technologiesId;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.projectTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.projectTable.count({ where }),
    ]);

    return { data: data.map(ProjectBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.projectTable.delete({ where: { public_id: publicId } });
  }
}
