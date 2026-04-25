import { BusinessError } from "src/domain/errors/business.error";
import { CodesError } from "src/domain/errors/codes.error";
import { UpdateProjectCommand } from "src/domain/port/in/project/update-project.interface.port";

const NANOID_REGEX = /^[A-Za-z0-9_-]{8,32}$/;

export class UpdateProjectValidator {
  validate(command: UpdateProjectCommand): void {
    if (command.title !== undefined && !command.title.trim()) {
      throw new BusinessError(CodesError.PROJECT_TITLE_REQUIRED);
    }
    if (command.description !== undefined && !command.description.trim()) {
      throw new BusinessError(CodesError.PROJECT_DESCRIPTION_REQUIRED);
    }
    if (command.githubUrl !== undefined && !command.githubUrl.trim()) {
      throw new BusinessError(CodesError.PROJECT_GITHUB_URL_INVALID);
    }
    if (command.addressUrl !== undefined && !command.addressUrl.trim()) {
      throw new BusinessError(CodesError.PROJECT_ADDRESS_URL_INVALID);
    }
    if (command.technologiesId !== undefined && !NANOID_REGEX.test(command.technologiesId)) {
      throw new BusinessError(CodesError.PROJECT_TECHNOLOGIES_ID_INVALID);
    }
    if (command.isPublic !== undefined && typeof command.isPublic !== "boolean") {
      throw new BusinessError(CodesError.PROJECT_IS_PUBLIC_INVALID);
    }
  }
}
