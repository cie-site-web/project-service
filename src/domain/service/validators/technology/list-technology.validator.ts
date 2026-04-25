import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { ListTechnologyQuery } from "src/domain/port/in/technology/list-technology.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class ListTechnologyValidator {
  validate(query: ListTechnologyQuery): void {
    if (!Number.isInteger(query.page) || query.page <= 0) throw new BusinessError(CodesError.PAGE_INVALID);
    if (!Number.isInteger(query.limit) || query.limit <= 0) throw new BusinessError(CodesError.LIMIT_INVALID);
    if (query.architectureId !== undefined && !NANOID_REGEX.test(query.architectureId)) {
      throw new BusinessError(CodesError.TECHNOLOGY_ARCHITECTURE_ID_INVALID);
    }
    if (query.frameworkId !== undefined && !NANOID_REGEX.test(query.frameworkId)) {
      throw new BusinessError(CodesError.TECHNOLOGY_FRAMEWORK_ID_INVALID);
    }
    if (query.utilsGestionId !== undefined && !NANOID_REGEX.test(query.utilsGestionId)) {
      throw new BusinessError(CodesError.TECHNOLOGY_UTILS_GESTION_ID_INVALID);
    }
  }
}
