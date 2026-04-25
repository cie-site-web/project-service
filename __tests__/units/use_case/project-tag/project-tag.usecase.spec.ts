import { beforeEach, describe, expect, it, vi, type Mocked } from "vitest";
import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { CreateProjectTagUseCase } from "src/application/use_case/project-tag/create-project-tag.usecase";
import { DeleteProjectTagUseCase } from "src/application/use_case/project-tag/delete-project-tag.usecase";
import { GetProjectTagUseCase } from "src/application/use_case/project-tag/get-project-tag.usecase";
import { ListProjectTagUseCase } from "src/application/use_case/project-tag/list-project-tag.usecase";
import { UpdateProjectTagUseCase } from "src/application/use_case/project-tag/update-project-tag.usecase";
import { ProjectTagEntity } from "src/domain/entities/project-tag.entity";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { ProjectTagRepositoryPort } from "src/domain/port/out/project-tag.repository.port";
import { CreateProjectTagValidator } from "src/domain/service/validators/project-tag/create-project-tag.validator";
import { DeleteProjectTagValidator } from "src/domain/service/validators/project-tag/delete-project-tag.validator";
import { GetProjectTagValidator } from "src/domain/service/validators/project-tag/get-project-tag.validator";
import { ListProjectTagValidator } from "src/domain/service/validators/project-tag/list-project-tag.validator";
import { UpdateProjectTagValidator } from "src/domain/service/validators/project-tag/update-project-tag.validator";

describe("ProjectTag use cases", () => {
  let repository: Mocked<ProjectTagRepositoryPort>;
  let idGenerator: Mocked<PublicIdGeneratorPort>;
  const valid = { projectId: "abcdEF12", tagsId: "abcdEF34" };

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
    const useCase = new CreateProjectTagUseCase(repository, new CreateProjectTagValidator(), idGenerator);
    const result = await useCase.execute(valid);
    expect(result.tagsId).toBe(valid.tagsId);
  });

  it("create should throw duplicate error", async () => {
    idGenerator.generateNanoid.mockReturnValue("pub12345");
    repository.findByPublicId.mockResolvedValue(new ProjectTagEntity({ publicId: "pub12345", ...valid }));
    const useCase = new CreateProjectTagUseCase(repository, new CreateProjectTagValidator(), idGenerator);
    await expect(useCase.execute(valid)).rejects.toThrowError(
      new ApplicationError(CodesError.DUPLICATE_PROJECT_TAG),
    );
  });

  it("get/update/delete/list should work", async () => {
    const entity = new ProjectTagEntity({ publicId: "pub12345", ...valid });
    repository.findByPublicId.mockResolvedValue(entity);
    repository.save.mockImplementation(async (e) => e);
    repository.findWithPagination.mockResolvedValue({ data: [entity], total: 1 });

    const get = new GetProjectTagUseCase(repository, new GetProjectTagValidator());
    const update = new UpdateProjectTagUseCase(repository, new UpdateProjectTagValidator());
    const del = new DeleteProjectTagUseCase(repository, new DeleteProjectTagValidator());
    const list = new ListProjectTagUseCase(repository, new ListProjectTagValidator());

    await expect(get.execute({ publicId: "pub12345" })).resolves.toEqual(entity);
    await expect(update.execute({ publicId: "pub12345" }, { tagsId: "abcdEF56" })).resolves.toBeDefined();
    await expect(del.execute({ publicId: "pub12345" })).resolves.toBeUndefined();
    await expect(list.execute({ page: 1, limit: 10 })).resolves.toMatchObject({ total: 1 });
  });
});
