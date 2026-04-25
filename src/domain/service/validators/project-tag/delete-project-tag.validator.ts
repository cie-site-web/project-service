import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { DeleteProjectTagCommand } from "src/domain/port/in/project-tag/delete-project-tag.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class DeleteProjectTagValidator {
  validate(command: DeleteProjectTagCommand): void {
    if (!NANOID_REGEX.test(command.publicId)) {
      throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
    }
  }
}
