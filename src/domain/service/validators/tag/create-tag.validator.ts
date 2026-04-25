import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateTagCommand } from "src/domain/port/in/tag/create-tag.interface.port";

export class CreateTagValidator {
  validate(command: CreateTagCommand): void {
    if (!command.name?.trim()) throw new BusinessError(CodesError.TAG_NAME_REQUIRED);
    if (!command.description?.trim()) throw new BusinessError(CodesError.TAG_DESCRIPTION_REQUIRED);
  }
}
