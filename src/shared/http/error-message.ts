import { ApiError } from "./api";

interface GetErrorMessageOptions {
  /**
   * Skip 5xx/technical sanitization and return the raw server/error message.
   * Use when the literal message is needed (e.g. control-flow inspection).
   */
  raw?: boolean;
}

const TECHNICAL_HINTS = ["prisma", "database", "connection"];
const GENERIC = "Something went wrong on our end. Please try again.";

/**
 * Turn any thrown value into a user-facing message.
 *
 * By default, 5xx responses and technical/database errors are sanitized to a
 * friendly generic message so server internals never reach the user. 4xx
 * server messages and the `fallback` pass through unchanged. Pass
 * `{ raw: true }` to skip sanitization.
 */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
  options: GetErrorMessageOptions = {},
): string {
  const status = error instanceof ApiError ? error.status : undefined;

  const baseMessage =
    error instanceof ApiError
      ? (error.response?.data?.message ?? "")
      : error instanceof Error
        ? error.message
        : "";

  if (!options.raw) {
    const isTechnical = TECHNICAL_HINTS.some((hint) =>
      baseMessage.toLowerCase().includes(hint),
    );
    if ((status !== undefined && status >= 500) || isTechnical) {
      return GENERIC;
    }
  }

  return baseMessage || fallback;
}
