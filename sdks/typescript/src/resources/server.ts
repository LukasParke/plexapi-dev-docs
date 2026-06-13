import type { PlexApiHttpClient } from "../client.js";
import type { paths } from "../types/openapi.js";

export type ServerIdentity =
  paths["/identity"]["get"]["responses"][200]["content"]["application/json"];

export type ServerInfo =
  paths["/"]["get"]["responses"][200]["content"]["application/json"];

export class ServerResource {
  constructor(private readonly client: PlexApiHttpClient) {}

  /**
   * Get server identity (machine identifier, claimed state, version).
   * Does not require authentication.
   */
  async getIdentity(): Promise<ServerIdentity> {
    return this.client.request<ServerIdentity>({ path: "/identity" });
  }

  /**
   * Get server information and capabilities.
   */
  async info(): Promise<ServerInfo> {
    return this.client.request<ServerInfo>({ path: "/" });
  }
}
