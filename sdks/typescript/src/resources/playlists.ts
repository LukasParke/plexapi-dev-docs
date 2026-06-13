import { PlexApiHttpClient } from "../client.js";
import type { paths } from "../types/openapi.js";

export type Playlists =
  paths["/playlists"]["get"]["responses"][200]["content"]["application/json"];

export type PlaylistItems =
  paths["/playlists/{playlistId}/items"]["get"]["responses"][200]["content"]["application/json"];

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
  async getItems(playlistId: number): Promise<PlaylistItems> {
    const path = PlexApiHttpClient.buildPath("/playlists/{playlistId}/items", { playlistId });
    return this.client.request<PlaylistItems>({ path });
  }
}
