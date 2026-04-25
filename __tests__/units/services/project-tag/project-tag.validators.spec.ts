import { describe, expect, it } from "vitest";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateProjectTagValidator } from "src/domain/service/validators/project-tag/create-project-tag.validator";
import { DeleteProjectTagValidator } from "src/domain/service/validators/project-tag/delete-project-tag.validator";
import { GetProjectTagValidator } from "src/domain/service/validators/project-tag/get-project-tag.validator";
import { ListProjectTagValidator } from "src/domain/service/validators/project-tag/list-project-tag.validator";
import { UpdateProjectTagValidator } from "src/domain/service/validators/project-tag/update-project-tag.validator";

describe("ProjectTag validators", () => {
  const valid = { projectId: "abcdEF12", tagsId: "abcdEF34" };

  it("create validator should accept valid payload", () => {
    expect(() => new CreateProjectTagValidator().validate(valid)).not.toThrow();
  });

  it("create/update validator should reject invalid ids", () => {
    expect(() =>
      new CreateProjectTagValidator().validate({ ...valid, projectId: "x" }),
    ).toThrowError(new BusinessError(CodesError.PROJECT_TAG_PROJECT_ID_INVALID));
    expect(() =>
      new UpdateProjectTagValidator().validate({ tagsId: "x" }),
    ).toThrowError(new BusinessError(CodesError.PROJECT_TAG_TAG_ID_INVALID));
  });

  it("get/delete validator should reject invalid publicId", () => {
    expect(() => new GetProjectTagValidator().validate({ publicId: "x" })).toThrowError(
      new BusinessError(CodesError.PUBLIC_ID_INVALID),
    );
    expect(() => new DeleteProjectTagValidator().validate({ publicId: "x" })).toThrowError(
      new BusinessError(CodesError.PUBLIC_ID_INVALID),
    );
  });

  it("list validator should reject invalid pagination", () => {
    expect(() =>
      new ListProjectTagValidator().validate({ page: 0, limit: 10 }),
    ).toThrowError(new BusinessError(CodesError.PAGE_INVALID));
  });
});
