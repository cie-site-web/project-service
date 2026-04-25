import { beforeEach, describe, expect, it, vi, type Mocked } from "vitest";
import { ApplicationError } from "src/application/errors/application.error";
import { CodesError } from "src/application/errors/codes.error";
import { CreateTechnologyUseCase } from "src/application/use_case/technology/create-technology.usecase";
import { DeleteTechnologyUseCase } from "src/application/use_case/technology/delete-technology.usecase";
import { GetTechnologyUseCase } from "src/application/use_case/technology/get-technology.usecase";
import { ListTechnologyUseCase } from "src/application/use_case/technology/list-technology.usecase";
import { UpdateTechnologyUseCase } from "src/application/use_case/technology/update-technology.usecase";
import { TechnologyEntity } from "src/domain/entities/technology.entity";
import { PublicIdGeneratorPort } from "src/domain/port/in/generate-public-id/generator-public-id.port";
import { TechnologyRepositoryPort } from "src/domain/port/out/technology.repository.port";
import { CreateTechnologyValidator } from "src/domain/service/validators/technology/create-technology.validator";
import { DeleteTechnologyValidator } from "src/domain/service/validators/technology/delete-technology.validator";
import { GetTechnologyValidator } from "src/domain/service/validators/technology/get-technology.validator";
import { ListTechnologyValidator } from "src/domain/service/validators/technology/list-technology.validator";
import { UpdateTechnologyValidator } from "src/domain/service/validators/technology/update-technology.validator";

describe("Technology use cases", () => {
  let repository: Mocked<TechnologyRepositoryPort>;
  let idGenerator: Mocked<PublicIdGeneratorPort>;
  const valid = {
    architectureId: "abcdEF12",
    frameworkId: "abcdEF34",
    utilsGestionId: "abcdEF56",
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
    const validator = new CreateTechnologyValidator();
    idGenerator.generateNanoid.mockReturnValue("pub12345");
    repository.findByPublicId.mockResolvedValue(null);
    repository.save.mockImplementation(async (e) => e);
    const useCase = new CreateTechnologyUseCase(repository, validator, idGenerator);
    const result = await useCase.execute(valid);
    expect(result.publicId).toBe("pub12345");
  });

  it("create should throw duplicate error", async () => {
    const validator = new CreateTechnologyValidator();
    idGenerator.generateNanoid.mockReturnValue("pub12345");
    repository.findByPublicId.mockResolvedValue(new TechnologyEntity({ publicId: "pub12345", ...valid }));
    const useCase = new CreateTechnologyUseCase(repository, validator, idGenerator);
    await expect(useCase.execute(valid)).rejects.toThrowError(
      new ApplicationError(CodesError.DUPLICATE_TECHNOLOGY),
    );
  });

  it("get/update/delete/list should work", async () => {
    const entity = new TechnologyEntity({ publicId: "pub12345", ...valid });
    repository.findByPublicId.mockResolvedValue(entity);
    repository.save.mockImplementation(async (e) => e);
    repository.findWithPagination.mockResolvedValue({ data: [entity], total: 1 });

    const get = new GetTechnologyUseCase(repository, new GetTechnologyValidator());
    const update = new UpdateTechnologyUseCase(repository, new UpdateTechnologyValidator());
    const del = new DeleteTechnologyUseCase(repository, new DeleteTechnologyValidator());
    const list = new ListTechnologyUseCase(repository, new ListTechnologyValidator());

    await expect(get.execute({ publicId: "pub12345" })).resolves.toEqual(entity);
    await expect(update.execute({ publicId: "pub12345" }, { frameworkId: "abcdEF78" })).resolves.toBeDefined();
    await expect(del.execute({ publicId: "pub12345" })).resolves.toBeUndefined();
    await expect(list.execute({ page: 1, limit: 10 })).resolves.toMatchObject({ total: 1 });
  });
});
