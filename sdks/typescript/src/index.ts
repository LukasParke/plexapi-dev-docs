import { PlexApiHttpClient, type PlexApiClientOptions, type paths } from "./client.js";
import {
  PlexApiError,
  PlexApiAuthError,
  PlexApiTimeoutError,
} from "./errors.js";
import { LibraryResource } from "./resources/library.js";
import { PlaylistsResource } from "./resources/playlists.js";
import { SearchResource } from "./resources/search.js";
import { ServerResource } from "./resources/server.js";
import { SessionsResource } from "./resources/sessions.js";

export type { PlexApiClientOptions, paths };
export { PlexApiError, PlexApiAuthError, PlexApiTimeoutError };

/**
 * High-level, ergonomic client for the Plex Media Server API.
 *
 * @example
 * ```ts
 * const client = new PlexApiClient({
 *   baseUrl: "http://localhost:32400",
 *   token: process.env.PLEX_TOKEN!,
 * });
 *
 * const libraries = await client.libraries.list();
 * console.log(libraries.MediaContainer?.Directory?.map((d) => d.title));
 * ```
 */
export class PlexApiClient {
  private readonly http: PlexApiHttpClient;

  readonly server: ServerResource;
  readonly libraries: LibraryResource;
  readonly sessions: SessionsResource;
  readonly playlists: PlaylistsResource;
  readonly search: SearchResource;

  constructor(options: PlexApiClientOptions) {
    this.http = new PlexApiHttpClient(options);
    this.server = new ServerResource(this.http);
    this.libraries = new LibraryResource(this.http);
    this.sessions = new SessionsResource(this.http);
    this.playlists = new PlaylistsResource(this.http);
    this.search = new SearchResource(this.http);
  }
}
