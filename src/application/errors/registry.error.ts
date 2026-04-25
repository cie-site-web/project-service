import { CodesError } from "./codes.error";

export const ErrorRegistry = {
  [CodesError.DATA_INVALID]: { httpStatus: 400 },
  [CodesError.PROJECT_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.TECHNOLOGY_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.TAG_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.PROJECT_TAG_NOT_FOUND]: { httpStatus: 404 },
  [CodesError.DUPLICATE_PROJECT]: { httpStatus: 400 },
  [CodesError.DUPLICATE_TECHNOLOGY]: { httpStatus: 400 },
  [CodesError.DUPLICATE_TAG]: { httpStatus: 400 },
  [CodesError.DUPLICATE_PROJECT_TAG]: { httpStatus: 400 },
} as const satisfies Record<
  (typeof CodesError)[keyof typeof CodesError],
  { httpStatus: number }
>;
