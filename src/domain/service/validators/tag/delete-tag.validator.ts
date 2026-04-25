import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { DeleteTagCommand } from "src/domain/port/in/tag/delete-tag.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class DeleteTagValidator {
  validate(command: DeleteTagCommand): void {
    if (!NANOID_REGEX.test(command.publicId)) {
      throw new BusinessError(CodesError.PUBLIC_ID_INVALID);
    }
  }
}
