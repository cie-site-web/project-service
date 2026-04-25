import { Injectable } from '@nestjs/common';
import { TechnologyBdMapper } from 'src/application/mapper/technology/technology-bd.mapper';
import { TechnologyEntity } from 'src/domain/entities/technology.entity';
import { ListTechnologyQuery } from 'src/domain/port/in/technology/list-technology.interface.port';
import { TechnologyRepositoryPort } from 'src/domain/port/out/technology.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class TechnologyRepositoryAdapter implements TechnologyRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: TechnologyEntity): Promise<TechnologyEntity> {
    const data = TechnologyBdMapper.toPersistence(entity);
    const saved = await this.prisma.technologyTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });
    return TechnologyBdMapper.toDomain(saved);
  }

  async findById(id: string): Promise<TechnologyEntity | null> {
    const entity = await this.prisma.technologyTable.findUnique({ where: { id } });
    return entity ? TechnologyBdMapper.toDomain(entity) : null;
  }

  async findByPublicId(publicId: string): Promise<TechnologyEntity | null> {
    const entity = await this.prisma.technologyTable.findUnique({
      where: { public_id: publicId },
    });
    return entity ? TechnologyBdMapper.toDomain(entity) : null;
  }

  async findWithPagination(
    query: ListTechnologyQuery,
  ): Promise<{ data: TechnologyEntity[]; total: number }> {
    const { page, limit, architectureId, frameworkId, utilsGestionId } = query;
    const where: Record<string, unknown> = {};
    if (architectureId) where.architecture_id = architectureId;
    if (frameworkId) where.framework_id = frameworkId;
    if (utilsGestionId) where.utils_gestion_id = utilsGestionId;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.technologyTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.technologyTable.count({ where }),
    ]);

    return { data: data.map(TechnologyBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.technologyTable.delete({ where: { public_id: publicId } });
  }
}
