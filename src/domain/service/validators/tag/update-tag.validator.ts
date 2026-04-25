import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateTagCommand } from "src/domain/port/in/tag/update-tag.interface.port";

export class UpdateTagValidator {
  validate(command: UpdateTagCommand): void {
    if (command.name !== undefined && !command.name.trim()) {
      throw new BusinessError(CodesError.TAG_NAME_REQUIRED);
    }
    if (command.description !== undefined && !command.description.trim()) {
      throw new BusinessError(CodesError.TAG_DESCRIPTION_REQUIRED);
    }
  }
}
