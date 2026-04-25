import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { CreateProjectTagCommand } from "src/domain/port/in/project-tag/create-project-tag.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class CreateProjectTagValidator {
  validate(command: CreateProjectTagCommand): void {
    if (!NANOID_REGEX.test(command.projectId)) {
      throw new BusinessError(CodesError.PROJECT_TAG_PROJECT_ID_INVALID);
    }
    if (!NANOID_REGEX.test(command.tagsId)) {
      throw new BusinessError(CodesError.PROJECT_TAG_TAG_ID_INVALID);
    }
  }
}
