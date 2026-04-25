import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateTechnologyCommand } from "src/domain/port/in/technology/update-technology.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class UpdateTechnologyValidator {
  validate(command: UpdateTechnologyCommand): void {
    if (command.architectureId !== undefined && !NANOID_REGEX.test(command.architectureId)) {
      throw new BusinessError(CodesError.TECHNOLOGY_ARCHITECTURE_ID_INVALID);
    }
    if (command.frameworkId !== undefined && !NANOID_REGEX.test(command.frameworkId)) {
      throw new BusinessError(CodesError.TECHNOLOGY_FRAMEWORK_ID_INVALID);
    }
    if (command.utilsGestionId !== undefined && !NANOID_REGEX.test(command.utilsGestionId)) {
      throw new BusinessError(CodesError.TECHNOLOGY_UTILS_GESTION_ID_INVALID);
    }
  }
}
