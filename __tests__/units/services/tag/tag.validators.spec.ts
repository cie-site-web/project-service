import { describe, expect, it } from "vitest";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateTagValidator } from "src/domain/service/validators/tag/create-tag.validator";
import { DeleteTagValidator } from "src/domain/service/validators/tag/delete-tag.validator";
import { GetTagValidator } from "src/domain/service/validators/tag/get-tag.validator";
import { ListTagValidator } from "src/domain/service/validators/tag/list-tag.validator";
import { UpdateTagValidator } from "src/domain/service/validators/tag/update-tag.validator";

describe("Tag validators", () => {
  const valid = { name: "nestjs", description: "framework" };

  it("create validator should accept valid payload", () => {
    expect(() => new CreateTagValidator().validate(valid)).not.toThrow();
  });

  it("create/update validator should reject bad text fields", () => {
    expect(() => new CreateTagValidator().validate({ ...valid, name: "" })).toThrowError(
      new BusinessError(CodesError.TAG_NAME_REQUIRED),
    );
    expect(() => new UpdateTagValidator().validate({ description: "" })).toThrowError(
      new BusinessError(CodesError.TAG_DESCRIPTION_REQUIRED),
    );
  });

  it("get/delete validator should reject invalid publicId", () => {
    expect(() => new GetTagValidator().validate({ publicId: "x" })).toThrowError(
      new BusinessError(CodesError.PUBLIC_ID_INVALID),
    );
    expect(() => new DeleteTagValidator().validate({ publicId: "x" })).toThrowError(
      new BusinessError(CodesError.PUBLIC_ID_INVALID),
    );
  });

  it("list validator should reject invalid pagination", () => {
    expect(() => new ListTagValidator().validate({ page: 1, limit: 0 })).toThrowError(
      new BusinessError(CodesError.LIMIT_INVALID),
    );
  });
});
