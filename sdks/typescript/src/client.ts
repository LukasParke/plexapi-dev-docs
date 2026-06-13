import type { paths } from "./types/openapi.js";
import { PlexApiAuthError, PlexApiError, PlexApiTimeoutError } from "./errors.js";

export interface PlexApiClientOptions {
  /** Plex server base URL, e.g. http://localhost:32400 */
  baseUrl: string;
  /** Plex authentication token. Never log or serialize this value. */
  token: string;
  /** Request timeout in milliseconds. */
  timeout?: number;
  /** Optional custom fetch implementation (useful for tests). */
  fetch?: typeof fetch;
}

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  body?: BodyInit | null;
}

function buildUrl(baseUrl: string, path: string, query?: RequestOptions["query"]): URL {
  const url = new URL(path, baseUrl);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url;
}

function redactHeaders(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (lower === "x-plex-token") {
      result[key] = "***REDACTED***";
    } else {
      result[key] = value;
    }
  });
  return result;
}

/**
 * Low-level HTTP client for the Plex Media Server API.
 */
export class PlexApiHttpClient {
  readonly baseUrl: string;
  readonly token: string;
  readonly timeout: number;
  readonly fetch: typeof fetch;

  constructor(options: PlexApiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.token = options.token;
    this.timeout = options.timeout ?? 30_000;
    this.fetch = options.fetch ?? globalThis.fetch;
  }

  async request<T = unknown>(options: RequestOptions): Promise<T> {
    const url = buildUrl(this.baseUrl, options.path, options.query);
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");
    headers.set("X-Plex-Token", this.token);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    let response: Response;
    try {
      response = await this.fetch(url.toString(), {
        method: options.method ?? "GET",
        headers,
        body: options.body,
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === "AbortError") {
        throw new PlexApiTimeoutError();
      }
      throw new PlexApiError(`Request failed: ${err instanceof Error ? err.message : String(err)}`);
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new PlexApiAuthError(
          `Plex API returned ${response.status}`,
          response.status,
          response,
        );
      }
      throw new PlexApiError(
        `Plex API returned ${response.status} ${response.statusText}`,
        response.status,
        response,
      );
    }

    // Some endpoints return empty bodies on success (e.g. refresh).
    const contentLength = response.headers.get("content-length");
    const hasEmptyBody =
      contentLength === "0" ||
      response.status === 204 ||
      (response.body === null);
    if (hasEmptyBody) {
      return undefined as T;
    }

    try {
      return (await response.json()) as T;
    } catch {
      throw new PlexApiError(
        "Failed to parse JSON response",
        response.status,
        response,
      );
    }
  }

  /**
   * Build a path using OpenAPI path parameter placeholders.
   */
  static buildPath(path: string, params: Record<string, string | number>): string {
    return path.replace(/\{([^}]+)\}/g, (_, key) => {
      const value = params[key];
      if (value === undefined || value === null) {
        throw new PlexApiError(`Missing path parameter: ${key}`);
      }
      return encodeURIComponent(String(value));
    });
  }
}

export type { paths };
