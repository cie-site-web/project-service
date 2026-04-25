import { beforeEach, describe, expect, it, vi, type Mocked } from "vitest";
import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { CreateProjectUseCase } from "src/application/use_case/project/create-project.usecase";
import { DeleteProjectUseCase } from "src/application/use_case/project/delete-project.usecase";
import { GetProjectUseCase } from "src/application/use_case/project/get-project.usecase";
import { ListProjectUseCase } from "src/application/use_case/project/list-project.usecase";
import { UpdateProjectUseCase } from "src/application/use_case/project/update-project.usecase";
import { ProjectEntity } from "src/domain/entities/project.entity";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { ProjectRepositoryPort } from "src/domain/port/out/project.repository.port";
import { CreateProjectValidator } from "src/domain/service/validators/project/create-project.validator";
import { DeleteProjectValidator } from "src/domain/service/validators/project/delete-project.validator";
import { GetProjectValidator } from "src/domain/service/validators/project/get-project.validator";
import { ListProjectValidator } from "src/domain/service/validators/project/list-project.validator";
import { UpdateProjectValidator } from "src/domain/service/validators/project/update-project.validator";

describe("Project use cases", () => {
  let repository: Mocked<ProjectRepositoryPort>;
  let idGenerator: Mocked<PublicIdGeneratorPort>;
  const valid = {
    title: "Portfolio",
    description: "My project",
    githubUrl: "https://github.com/org/repo",
    addressUrl: "https://demo.example.com",
    isPublic: true,
    technologiesId: "abcdEF12",
  };

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
    const validator = new CreateProjectValidator();
    vi.spyOn(validator, "validate");
    idGenerator.generateNanoid.mockReturnValue("pub12345");
    repository.findByPublicId.mockResolvedValue(null);
    repository.save.mockImplementation(async (e) => e);
    const useCase = new CreateProjectUseCase(repository, validator, idGenerator);

    const result = await useCase.execute(valid);
    expect(validator.validate).toHaveBeenCalledOnce();
    expect(result.publicId).toBe("pub12345");
    expect(repository.save).toHaveBeenCalledOnce();
  });

  it("create should throw duplicate error", async () => {
    const validator = new CreateProjectValidator();
    idGenerator.generateNanoid.mockReturnValue("pub12345");
    repository.findByPublicId.mockResolvedValue(new ProjectEntity({ publicId: "pub12345", ...valid }));
    const useCase = new CreateProjectUseCase(repository, validator, idGenerator);
    await expect(useCase.execute(valid)).rejects.toThrowError(
      new ApplicationError(CodesError.DUPLICATE_PROJECT),
    );
  });

  it("get should return entity", async () => {
    const validator = new GetProjectValidator();
    const entity = new ProjectEntity({ publicId: "pub12345", ...valid });
    repository.findByPublicId.mockResolvedValue(entity);
    const useCase = new GetProjectUseCase(repository, validator);
    await expect(useCase.execute({ publicId: "pub12345" })).resolves.toEqual(entity);
  });

  it("update should save modified entity", async () => {
    const validator = new UpdateProjectValidator();
    const entity = new ProjectEntity({ publicId: "pub12345", ...valid });
    repository.findByPublicId.mockResolvedValue(entity);
    repository.save.mockImplementation(async (e) => e);
    const useCase = new UpdateProjectUseCase(repository, validator);
    const result = await useCase.execute(
      { publicId: "pub12345" },
      { title: "Updated title" },
    );
    expect(result.title).toBe("Updated title");
  });

  it("delete should remove existing entity", async () => {
    const validator = new DeleteProjectValidator();
    repository.findByPublicId.mockResolvedValue(new ProjectEntity({ publicId: "pub12345", ...valid }));
    const useCase = new DeleteProjectUseCase(repository, validator);
    await useCase.execute({ publicId: "pub12345" });
    expect(repository.delete).toHaveBeenCalledWith("pub12345");
  });

  it("list should return paginated data", async () => {
    const validator = new ListProjectValidator();
    repository.findWithPagination.mockResolvedValue({
      data: [new ProjectEntity({ publicId: "pub12345", ...valid })],
      total: 1,
    });
    const useCase = new ListProjectUseCase(repository, validator);
    const result = await useCase.execute({ page: 1, limit: 10 });
    expect(result.totalPages).toBe(1);
    expect(result.data).toHaveLength(1);
  });
});
