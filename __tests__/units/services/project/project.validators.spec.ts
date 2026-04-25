import { describe, expect, it } from "vitest";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateProjectValidator } from "src/domain/service/validators/project/create-project.validator";
import { DeleteProjectValidator } from "src/domain/service/validators/project/delete-project.validator";
import { GetProjectValidator } from "src/domain/service/validators/project/get-project.validator";
import { ListProjectValidator } from "src/domain/service/validators/project/list-project.validator";
import { UpdateProjectValidator } from "src/domain/service/validators/project/update-project.validator";

describe("Project validators", () => {
  const valid = {
    title: "Portfolio",
    description: "My project",
    githubUrl: "https://github.com/org/repo",
    addressUrl: "https://demo.example.com",
    isPublic: true,
    technologiesId: "abcdEF12",
  };

  it("create validator should accept valid payload", () => {
    expect(() => new CreateProjectValidator().validate(valid)).not.toThrow();
  });

  it("create validator should reject missing title", () => {
    expect(() =>
      new CreateProjectValidator().validate({ ...valid, title: "" }),
    ).toThrowError(new BusinessError(CodesError.PROJECT_TITLE_REQUIRED));
  });

  it("get/delete validator should reject invalid publicId", () => {
    expect(() =>
      new GetProjectValidator().validate({ publicId: "x" }),
    ).toThrowError(new BusinessError(CodesError.PUBLIC_ID_INVALID));
    expect(() =>
      new DeleteProjectValidator().validate({ publicId: "x" }),
    ).toThrowError(new BusinessError(CodesError.PUBLIC_ID_INVALID));
  });

  it("update/list validator should validate bad values", () => {
    expect(() =>
      new UpdateProjectValidator().validate({ title: "" }),
    ).toThrowError(new BusinessError(CodesError.PROJECT_TITLE_REQUIRED));
    expect(() =>
      new ListProjectValidator().validate({ page: 0, limit: 10 }),
    ).toThrowError(new BusinessError(CodesError.PAGE_INVALID));
  });
});
