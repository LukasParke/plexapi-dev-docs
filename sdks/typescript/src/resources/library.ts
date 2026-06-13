import { PlexApiHttpClient } from "../client.js";
import type { paths } from "../types/openapi.js";

export type LibrarySections =
  paths["/library/sections"]["get"]["responses"][200]["content"]["application/json"];

export type LibraryItemsQuery = NonNullable<
  paths["/library/sections/{sectionId}/all"]["get"]["parameters"]["query"]
>;

export type LibraryItemsHeaders = NonNullable<
  paths["/library/sections/{sectionId}/all"]["get"]["parameters"]["header"]
>;

export type LibraryItems =
  paths["/library/sections/{sectionId}/all"]["get"]["responses"][200]["content"]["application/json"];

export type MetadataItem =
  paths["/library/metadata/{ratingKey}"]["get"]["responses"][200]["content"]["application/json"];

export type MetadataChildren =
  paths["/library/metadata/{ratingKey}/children"]["get"]["responses"][200]["content"]["application/json"];

export interface ListLibraryItemsOptions {
  sectionId: number;
  type?: LibraryItemsQuery["type"];
  containerSize?: LibraryItemsHeaders["X-Plex-Container-Size"];
  containerStart?: LibraryItemsHeaders["X-Plex-Container-Start"];
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
    const path = PlexApiHttpClient.buildPath("/library/sections/{sectionId}/all", {
      sectionId: options.sectionId,
    });

    return this.client.request<LibraryItems>({
      path,
      query: {
        type: options.type,
      },
      headers: {
        "X-Plex-Container-Size": options.containerSize?.toString(),
        "X-Plex-Container-Start": options.containerStart?.toString(),
      } as Record<string, string>,
    });
  }

  /**
   * Refresh a library section.
   */
  async refresh(sectionId: number, force = false): Promise<void> {
    const path = PlexApiHttpClient.buildPath("/library/sections/{sectionId}/refresh", {
      sectionId,
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
   * Get metadata for an item by its rating key.
   */
  async getMetadata(ratingKey: number): Promise<MetadataItem> {
    const path = PlexApiHttpClient.buildPath("/library/metadata/{ratingKey}", { ratingKey });
    return this.client.request<MetadataItem>({ path });
  }

  /**
   * Get children of a metadata item (e.g. seasons of a show).
   */
  async getChildren(ratingKey: number): Promise<MetadataChildren> {
    const path = PlexApiHttpClient.buildPath("/library/metadata/{ratingKey}/children", {
      ratingKey,
    });
    return this.client.request<MetadataChildren>({ path });
  }
}
