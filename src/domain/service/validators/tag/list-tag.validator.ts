import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { ListTagQuery } from "src/domain/port/in/tag/list-tag.interface.port";

export class ListTagValidator {
  validate(query: ListTagQuery): void {
    if (!Number.isInteger(query.page) || query.page <= 0) throw new BusinessError(CodesError.PAGE_INVALID);
    if (!Number.isInteger(query.limit) || query.limit <= 0) throw new BusinessError(CodesError.LIMIT_INVALID);
    if (query.name !== undefined && !query.name.trim()) throw new BusinessError(CodesError.TAG_NAME_REQUIRED);
  }
}
