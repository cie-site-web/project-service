import { Injectable } from '@nestjs/common';
import { TagBdMapper } from 'src/application/mapper/tag/tag-bd.mapper';
import { TagEntity } from 'src/domain/entities/tag.entity';
import { ListTagQuery } from 'src/domain/port/in/tag/list-tag.interface.port';
import { TagRepositoryPort } from 'src/domain/port/out/tag.repository.port';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';

@Injectable()
export class TagRepositoryAdapter implements TagRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: TagEntity): Promise<TagEntity> {
    const data = TagBdMapper.toPersistence(entity);
    const saved = await this.prisma.tagTable.upsert({
      where: { public_id: entity.publicId },
      update: data,
      create: data,
    });
    return TagBdMapper.toDomain(saved);
  }

  async findById(id: string): Promise<TagEntity | null> {
    const entity = await this.prisma.tagTable.findUnique({ where: { id } });
    return entity ? TagBdMapper.toDomain(entity) : null;
  }

  async findByPublicId(publicId: string): Promise<TagEntity | null> {
    const entity = await this.prisma.tagTable.findUnique({
      where: { public_id: publicId },
    });
    return entity ? TagBdMapper.toDomain(entity) : null;
  }

  async findWithPagination(
    query: ListTagQuery,
  ): Promise<{ data: TagEntity[]; total: number }> {
    const { page, limit, name } = query;
    const where: Record<string, unknown> = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.tagTable.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.tagTable.count({ where }),
    ]);

    return { data: data.map(TagBdMapper.toDomain), total };
  }

  async delete(publicId: string): Promise<void> {
    await this.prisma.tagTable.delete({ where: { public_id: publicId } });
  }
}
