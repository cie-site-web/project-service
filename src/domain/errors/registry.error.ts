import { CodesError } from "./codes.error";

export const ErrorRegistry = {
  [CodesError.PUBLIC_ID_INVALID]: { httpStatus: 400 },
  [CodesError.PAGE_INVALID]: { httpStatus: 400 },
  [CodesError.LIMIT_INVALID]: { httpStatus: 400 },
  [CodesError.PROJECT_ID_INVALID]: { httpStatus: 400 },
  [CodesError.PROJECT_TITLE_REQUIRED]: { httpStatus: 400 },
  [CodesError.PROJECT_DESCRIPTION_REQUIRED]: { httpStatus: 400 },
  [CodesError.PROJECT_GITHUB_URL_INVALID]: { httpStatus: 400 },
  [CodesError.PROJECT_ADDRESS_URL_INVALID]: { httpStatus: 400 },
  [CodesError.PROJECT_IS_PUBLIC_INVALID]: { httpStatus: 400 },
  [CodesError.PROJECT_TECHNOLOGIES_ID_INVALID]: { httpStatus: 400 },
  [CodesError.TECHNOLOGY_ID_INVALID]: { httpStatus: 400 },
  [CodesError.TECHNOLOGY_ARCHITECTURE_ID_INVALID]: { httpStatus: 400 },
  [CodesError.TECHNOLOGY_FRAMEWORK_ID_INVALID]: { httpStatus: 400 },
  [CodesError.TECHNOLOGY_UTILS_GESTION_ID_INVALID]: { httpStatus: 400 },
  [CodesError.TAG_ID_INVALID]: { httpStatus: 400 },
  [CodesError.TAG_NAME_REQUIRED]: { httpStatus: 400 },
  [CodesError.TAG_DESCRIPTION_REQUIRED]: { httpStatus: 400 },
  [CodesError.PROJECT_TAG_ID_INVALID]: { httpStatus: 400 },
  [CodesError.PROJECT_TAG_PROJECT_ID_INVALID]: { httpStatus: 400 },
  [CodesError.PROJECT_TAG_TAG_ID_INVALID]: { httpStatus: 400 },
} as const satisfies Record<
  (typeof CodesError)[keyof typeof CodesError],
  { httpStatus: number }
>;
