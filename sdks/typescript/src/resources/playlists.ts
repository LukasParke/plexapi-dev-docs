import { PlexApiHttpClient } from "../client.js";
import type { paths } from "../types/openapi.js";

export type Playlists =
  paths["/playlists"]["get"]["responses"][200]["content"]["application/json"];

export type PlaylistItems =
  paths["/playlists/{playlistKey}/items"]["get"]["responses"][200]["content"]["application/json"];

export class PlaylistsResource {
  constructor(private readonly client: PlexApiHttpClient) {}

  /**
   * List all playlists.
   */
  async list(): Promise<Playlists> {
    return this.client.request<Playlists>({ path: "/playlists" });
  }

  /**
   * Get items in a playlist.
   */
  async getItems(playlistKey: string): Promise<PlaylistItems> {
    const path = PlexApiHttpClient.buildPath("/playlists/{playlistKey}/items", { playlistKey });
    return this.client.request<PlaylistItems>({ path });
  }
}
