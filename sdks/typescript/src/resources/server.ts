import type { PlexApiHttpClient } from "../client.js";
import type { paths } from "../types/openapi.js";

export type ServerIdentity = paths["/"]["get"]["responses"][200]["content"]["application/json"];

export class ServerResource {
  constructor(private readonly client: PlexApiHttpClient) {}

  /**
   * Get server identity and capabilities.
   */
  async identity(): Promise<ServerIdentity> {
    return this.client.request<ServerIdentity>({ path: "/" });
  }
}
