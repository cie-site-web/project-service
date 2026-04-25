import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { ListProjectTagQuery } from "src/domain/port/in/project-tag/list-project-tag.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class ListProjectTagValidator {
  validate(query: ListProjectTagQuery): void {
    if (!Number.isInteger(query.page) || query.page <= 0) throw new BusinessError(CodesError.PAGE_INVALID);
    if (!Number.isInteger(query.limit) || query.limit <= 0) throw new BusinessError(CodesError.LIMIT_INVALID);
    if (query.projectId !== undefined && !NANOID_REGEX.test(query.projectId)) {
      throw new BusinessError(CodesError.PROJECT_TAG_PROJECT_ID_INVALID);
    }
    if (query.tagsId !== undefined && !NANOID_REGEX.test(query.tagsId)) {
      throw new BusinessError(CodesError.PROJECT_TAG_TAG_ID_INVALID);
    }
  }
}
