import { ErrorResponse } from "../types";

export const API_ROOT = "https://jsonplaceholder.typicode.com";

export function isError(obj: unknown): obj is ErrorResponse {
  return Boolean((obj as ErrorResponse)?.code);
}

export async function fetchJSON<T, E = ErrorResponse>(
  route: string
): Promise<T | E> {
  const response = await fetch(route);

  const output = await response.json();

  return output;
}
