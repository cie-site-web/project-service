import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { GetProjectQuery } from "src/domain/port/in/project/get-project.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class GetProjectValidator {
  validate(query: GetProjectQuery): void {
    if (!NANOID_REGEX.test(query.publicId)) {
      throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
    }
  }
}
