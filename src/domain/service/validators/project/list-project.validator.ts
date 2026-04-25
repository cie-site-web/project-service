import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { ListProjectQuery } from "src/domain/port/in/project/list-project.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class ListProjectValidator {
  validate(query: ListProjectQuery): void {
    if (!Number.isInteger(query.page) || query.page <= 0) throw new BusinessError(CodesError.PAGE_INVALID);
    if (!Number.isInteger(query.limit) || query.limit <= 0) throw new BusinessError(CodesError.LIMIT_INVALID);
    if (query.title !== undefined && !query.title.trim()) throw new BusinessError(CodesError.PROJECT_TITLE_REQUIRED);
    if (query.technologiesId !== undefined && !NANOID_REGEX.test(query.technologiesId)) {
      throw new BusinessError(CodesError.PROJECT_TECHNOLOGIES_ID_INVALID);
    }
    if (query.isPublic !== undefined && typeof query.isPublic !== "boolean") {
      throw new BusinessError(CodesError.PROJECT_IS_PUBLIC_INVALID);
    }
  }
}
