import { beforeEach, describe, expect, it, vi, type Mocked } from "vitest";
import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { CreateTagUseCase } from "src/application/use_case/tag/create-tag.usecase";
import { DeleteTagUseCase } from "src/application/use_case/tag/delete-tag.usecase";
import { GetTagUseCase } from "src/application/use_case/tag/get-tag.usecase";
import { ListTagUseCase } from "src/application/use_case/tag/list-tag.usecase";
import { UpdateTagUseCase } from "src/application/use_case/tag/update-tag.usecase";
import { TagEntity } from "src/domain/entities/tag.entity";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { TagRepositoryPort } from "src/domain/port/out/tag.repository.port";
import { CreateTagValidator } from "src/domain/service/validators/tag/create-tag.validator";
import { DeleteTagValidator } from "src/domain/service/validators/tag/delete-tag.validator";
import { GetTagValidator } from "src/domain/service/validators/tag/get-tag.validator";
import { ListTagValidator } from "src/domain/service/validators/tag/list-tag.validator";
import { UpdateTagValidator } from "src/domain/service/validators/tag/update-tag.validator";

describe("Tag use cases", () => {
  let repository: Mocked<TagRepositoryPort>;
  let idGenerator: Mocked<PublicIdGeneratorPort>;
  const valid = { name: "nestjs", description: "framework" };

  beforeEach(() => {
    repository = {
      save: vi.fn(),
      findById: vi.fn(),
      findByPublicId: vi.fn(),
      findWithPagination: vi.fn(),
      delete: vi.fn(),
    };
    idGenerator = { generateNanoid: vi.fn() };
  });

  it("create should persist entity", async () => {
    idGenerator.generateNanoid.mockReturnValue("pub12345");
    repository.findByPublicId.mockResolvedValue(null);
    repository.save.mockImplementation(async (e) => e);
    const useCase = new CreateTagUseCase(repository, new CreateTagValidator(), idGenerator);
    const result = await useCase.execute(valid);
    expect(result.name).toBe("nestjs");
  });

  it("create should throw duplicate error", async () => {
    idGenerator.generateNanoid.mockReturnValue("pub12345");
    repository.findByPublicId.mockResolvedValue(new TagEntity({ publicId: "pub12345", ...valid }));
    const useCase = new CreateTagUseCase(repository, new CreateTagValidator(), idGenerator);
    await expect(useCase.execute(valid)).rejects.toThrowError(new ApplicationError(CodesError.DUPLICATE_TAG));
  });

  it("get/update/delete/list should work", async () => {
    const entity = new TagEntity({ publicId: "pub12345", ...valid });
    repository.findByPublicId.mockResolvedValue(entity);
    repository.save.mockImplementation(async (e) => e);
    repository.findWithPagination.mockResolvedValue({ data: [entity], total: 1 });

    const get = new GetTagUseCase(repository, new GetTagValidator());
    const update = new UpdateTagUseCase(repository, new UpdateTagValidator());
    const del = new DeleteTagUseCase(repository, new DeleteTagValidator());
    const list = new ListTagUseCase(repository, new ListTagValidator());

    await expect(get.execute({ publicId: "pub12345" })).resolves.toEqual(entity);
    await expect(update.execute({ publicId: "pub12345" }, { description: "updated" })).resolves.toBeDefined();
    await expect(del.execute({ publicId: "pub12345" })).resolves.toBeUndefined();
    await expect(list.execute({ page: 1, limit: 10 })).resolves.toMatchObject({ total: 1 });
  });
});
