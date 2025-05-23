// Define the shape you showed us
interface ApiErrorResponse {
  success: boolean;
  message: string;
  data?: {
    errors?: Record<string, string[]>;
  };
}

/**
 * Extracts an array of error messages from a validation API response.
 *
 * - If `data.errors` is present, returns
 *   ["field1: msg1", "field1: msg2", "field2: msg1", …].
 * - Otherwise returns [response.message] (or a generic fallback).
 */
export function extractErrorMessages(response: ApiErrorResponse): string[] {
  const errs = response.data?.errors;
  console.log(errs);
  if (errs && typeof errs === "object") {
    return Object.entries(errs).flatMap(([field, messages]) =>
      messages.map((msg) => `${field}: ${msg}`)
    );
  }

  if (response.message) {
    return [response.message];
  }

  return ["An unknown error occurred."];
}
