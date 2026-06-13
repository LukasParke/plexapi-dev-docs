import type { PlexApiHttpClient } from "../client.js";
import type { paths } from "../types/openapi.js";

export type SearchQuery = paths["/hubs/search"]["get"]["parameters"]["query"];
export type SearchResults =
  paths["/hubs/search"]["get"]["responses"][200]["content"]["application/json"];

export class SearchResource {
  constructor(private readonly client: PlexApiHttpClient) {}

  /**
   * Search across hubs.
   */
  async query(query: string, limit?: number): Promise<SearchResults> {
    return this.client.request<SearchResults>({
      path: "/hubs/search",
      query: {
        query,
        limit,
      } as SearchQuery,
    });
  }
}
