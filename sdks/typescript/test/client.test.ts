import { describe, it, expect, vi } from "vitest";
import { PlexApiClient, PlexApiAuthError, PlexApiTimeoutError } from "../src/index.ts";

function createMockFetch(response: Response): typeof fetch {
  return vi.fn().mockResolvedValue(response) as unknown as typeof fetch;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("PlexApiClient", () => {
  it("lists libraries", async () => {
    const mockFetch = createMockFetch(
      jsonResponse({
        MediaContainer: {
          size: 2,
          Directory: [
            { key: "1", title: "Movies", type: "movie" },
            { key: "2", title: "TV Shows", type: "show" },
          ],
        },
      }),
    );

    const client = new PlexApiClient({
      baseUrl: "http://localhost:32400",
      token: "test-token",
      fetch: mockFetch,
    });

    const result = await client.libraries.list();

    expect(result.MediaContainer?.size).toBe(2);
    expect(result.MediaContainer?.Directory?.[0].title).toBe("Movies");
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const request = mockFetch.mock.calls[0] as [RequestInfo, RequestInit?];
    const url = new URL(request[0].toString());
    expect(url.pathname).toBe("/library/sections");
    expect((request[1]?.headers as Headers).get("X-Plex-Token")).toBe("test-token");
  });

  it("lists items in a library section", async () => {
    const mockFetch = createMockFetch(
      jsonResponse({
        MediaContainer: {
          size: 1,
          Video: [{ ratingKey: "42", title: "Inception", type: "movie" }],
        },
      }),
    );

    const client = new PlexApiClient({
      baseUrl: "http://localhost:32400",
      token: "test-token",
      fetch: mockFetch,
    });

    const result = await client.libraries.listItems({ sectionId: 1, type: 1 });

    expect(result.MediaContainer?.Video?.[0].title).toBe("Inception");

    const request = mockFetch.mock.calls[0] as [RequestInfo, RequestInit?];
    const url = new URL(request[0].toString());
    expect(url.pathname).toBe("/library/sections/1/all");
    expect(url.searchParams.get("type")).toBe("1");
  });

  it("refreshes a library section", async () => {
    const mockFetch = createMockFetch(new Response(null, { status: 200 }));

    const client = new PlexApiClient({
      baseUrl: "http://localhost:32400",
      token: "test-token",
      fetch: mockFetch,
    });

    await client.libraries.refresh(1, true);

    const request = mockFetch.mock.calls[0] as [RequestInfo, RequestInit?];
    const url = new URL(request[0].toString());
    expect(url.pathname).toBe("/library/sections/1/refresh");
    expect(url.searchParams.get("force")).toBe("1");
    expect(request[1]?.method).toBe("POST");
  });

  it("throws auth error on 401", async () => {
    const mockFetch = createMockFetch(jsonResponse({ error: "unauthorized" }, 401));

    const client = new PlexApiClient({
      baseUrl: "http://localhost:32400",
      token: "bad-token",
      fetch: mockFetch,
    });

    await expect(client.server.identity()).rejects.toBeInstanceOf(PlexApiAuthError);
  });

  it("throws timeout error when request aborts", async () => {
    const mockFetch = vi.fn().mockImplementation(() => {
      const error = new Error("The operation was aborted");
      error.name = "AbortError";
      return Promise.reject(error);
    }) as unknown as typeof fetch;

    const client = new PlexApiClient({
      baseUrl: "http://localhost:32400",
      token: "test-token",
      fetch: mockFetch,
      timeout: 1,
    });

    await expect(client.server.identity()).rejects.toBeInstanceOf(PlexApiTimeoutError);
  });
});
