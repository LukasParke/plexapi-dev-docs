import { PlexApiHttpClient } from "../client.js";
import type { paths } from "../types/openapi.js";

export type LibrarySections =
  paths["/library/sections"]["get"]["responses"][200]["content"]["application/json"];

export type LibraryItemsQuery = NonNullable<
  paths["/library/sections/{sectionKey}/all"]["get"]["parameters"]["query"]
>;

export type LibraryItems =
  paths["/library/sections/{sectionKey}/all"]["get"]["responses"][200]["content"]["application/json"];

export interface ListLibraryItemsOptions {
  sectionKey: string;
  type?: LibraryItemsQuery["type"];
  includeCollections?: LibraryItemsQuery["includeCollections"];
}

export class LibraryResource {
  constructor(private readonly client: PlexApiHttpClient) {}

  /**
   * List all media libraries.
   */
  async list(): Promise<LibrarySections> {
    return this.client.request<LibrarySections>({ path: "/library/sections" });
  }

  /**
   * List all items in a library section.
   */
  async listItems(options: ListLibraryItemsOptions): Promise<LibraryItems> {
    const path = PlexApiHttpClient.buildPath("/library/sections/{sectionKey}/all", {
      sectionKey: options.sectionKey,
    });

    return this.client.request<LibraryItems>({
      path,
      query: {
        type: options.type,
        includeCollections: options.includeCollections,
      },
    });
  }
}
