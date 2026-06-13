import { PlexApiHttpClient } from "../client.js";
import type { paths } from "../types/openapi.js";

export type LibrarySections =
  paths["/library/sections"]["get"]["responses"][200]["content"]["application/json"];

export type LibraryItemsQuery = NonNullable<
  paths["/library/sections/{sectionKey}/all"]["get"]["parameters"]["query"]
>;

export type LibraryItems =
  paths["/library/sections/{sectionKey}/all"]["get"]["responses"][200]["content"]["application/json"];

export type LibrarySearchResults =
  paths["/library/sections/{sectionKey}/search"]["get"]["responses"][200]["content"]["application/json"];

export type MetadataItem =
  paths["/library/metadata/{ratingKey}"]["get"]["responses"][200]["content"]["application/json"];

export type MetadataChildren =
  paths["/library/metadata/{ratingKey}/children"]["get"]["responses"][200]["content"]["application/json"];

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

  /**
   * Refresh a library section.
   */
  async refresh(sectionKey: string, force = false): Promise<void> {
    const path = PlexApiHttpClient.buildPath("/library/sections/{sectionKey}/refresh", {
      sectionKey,
    });

    await this.client.request<void>({
      method: "POST",
      path,
      query: {
        force: force ? 1 : 0,
      },
    });
  }

  /**
   * Search within a library section.
   */
  async search(sectionKey: string, query: string): Promise<LibrarySearchResults> {
    const path = PlexApiHttpClient.buildPath("/library/sections/{sectionKey}/search", {
      sectionKey,
    });

    return this.client.request<LibrarySearchResults>({
      path,
      query: {
        query,
      },
    });
  }

  /**
   * Get metadata for an item by its rating key.
   */
  async getMetadata(ratingKey: string): Promise<MetadataItem> {
    const path = PlexApiHttpClient.buildPath("/library/metadata/{ratingKey}", { ratingKey });
    return this.client.request<MetadataItem>({ path });
  }

  /**
   * Get children of a metadata item (e.g. seasons of a show).
   */
  async getChildren(ratingKey: string): Promise<MetadataChildren> {
    const path = PlexApiHttpClient.buildPath("/library/metadata/{ratingKey}/children", {
      ratingKey,
    });
    return this.client.request<MetadataChildren>({ path });
  }
}
