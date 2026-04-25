import { describe, expect, it } from "vitest";
import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateTechnologyValidator } from "src/domain/service/validators/technology/create-technology.validator";
import { DeleteTechnologyValidator } from "src/domain/service/validators/technology/delete-technology.validator";
import { GetTechnologyValidator } from "src/domain/service/validators/technology/get-technology.validator";
import { ListTechnologyValidator } from "src/domain/service/validators/technology/list-technology.validator";
import { UpdateTechnologyValidator } from "src/domain/service/validators/technology/update-technology.validator";

describe("Technology validators", () => {
  const valid = {
    architectureId: "abcdEF12",
    frameworkId: "abcdEF34",
    utilsGestionId: "abcdEF56",
  };

  it("create validator should accept valid payload", () => {
    expect(() => new CreateTechnologyValidator().validate(valid)).not.toThrow();
  });

  it("create validator should reject invalid ids", () => {
    expect(() =>
      new CreateTechnologyValidator().validate({ ...valid, frameworkId: "x" }),
    ).toThrowError(new BusinessError(CodesError.TECHNOLOGY_FRAMEWORK_ID_INVALID));
  });

  it("get/delete validator should reject invalid publicId", () => {
    expect(() =>
      new GetTechnologyValidator().validate({ publicId: "x" }),
    ).toThrowError(new BusinessError(CodesError.PUBLIC_ID_INVALID));
    expect(() =>
      new DeleteTechnologyValidator().validate({ publicId: "x" }),
    ).toThrowError(new BusinessError(CodesError.PUBLIC_ID_INVALID));
  });

  it("update/list validator should validate bad values", () => {
    expect(() =>
      new UpdateTechnologyValidator().validate({ architectureId: "x" }),
    ).toThrowError(new BusinessError(CodesError.TECHNOLOGY_ARCHITECTURE_ID_INVALID));
    expect(() =>
      new ListTechnologyValidator().validate({ page: 1, limit: 0 }),
    ).toThrowError(new BusinessError(CodesError.LIMIT_INVALID));
  });
});
