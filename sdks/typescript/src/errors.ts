/**
 * Base error class for all Plex SDK errors.
 */
export class PlexApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: Response,
  ) {
    super(message);
    this.name = "PlexApiError";
  }
}

/**
 * Authentication or authorization failure.
 */
export class PlexApiAuthError extends PlexApiError {
  constructor(message = "Plex authentication failed", statusCode?: number, response?: Response) {
    super(message, statusCode, response);
    this.name = "PlexApiAuthError";
  }
}

/**
 * Request timeout.
 */
export class PlexApiTimeoutError extends PlexApiError {
  constructor(message = "Plex API request timed out") {
    super(message);
    this.name = "PlexApiTimeoutError";
  }
}
