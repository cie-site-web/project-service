import type { CodesError } from "./codes.error";

export class BusinessError extends Error {
  constructor(
    public readonly code: CodesError,
    public readonly metadata?: Record<string, unknown>,
  ) {
    super(code);
  }
}
