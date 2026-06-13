import type { PlexApiHttpClient } from "../client.js";
import type { paths } from "../types/openapi.js";

export type Sessions =
  paths["/status/sessions"]["get"]["responses"][200]["content"]["application/json"];

export class SessionsResource {
  constructor(private readonly client: PlexApiHttpClient) {}

  /**
   * Get active playback sessions.
   */
  async list(): Promise<Sessions> {
    return this.client.request<Sessions>({ path: "/status/sessions" });
  }
}
