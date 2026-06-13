# @plexapi/sdk (proof of concept)

TypeScript SDK for the Plex Media Server API. This package is a **proof of concept** demonstrating the hybrid SDK strategy described in the root [`sdk-generation-strategy.md`](../../sdk-generation-strategy.md):

- **Generated layer**: types produced from the canonical OpenAPI spec via `openapi-typescript`.
- **Hand-written layer**: ergonomic, resource-oriented client built on top of `fetch`.

## Install

```bash
npm install @plexapi/sdk
```

## Quick start

```ts
import { PlexApiClient } from "@plexapi/sdk";

const client = new PlexApiClient({
  baseUrl: "http://localhost:32400",
  token: process.env.PLEX_TOKEN!,
});

const libraries = await client.libraries.list();
console.log(libraries.MediaContainer?.Directory?.map((d) => d.title));
```

Run the included example:

```bash
PLEX_TOKEN=your-token npm run example
```

## Features

- Type-safe responses generated from the OpenAPI contract.
- Resource-oriented API: `client.libraries`, `client.sessions`, `client.playlists`, `client.search`, `client.server`.
- Plex token sent as `X-Plex-Token` header; redacted from error metadata.
- Consistent error hierarchy: `PlexApiError`, `PlexApiAuthError`, `PlexApiTimeoutError`.
- Configurable request timeout and custom `fetch` injection for testing.

## Development

```bash
npm install
npm run generate:types   # regenerate types from schemas/plex-media-server.openapi.json
npm run typecheck        # run TypeScript type checking
npm run test             # run Vitest suite
npm run build            # compile to dist/
```

## Status

This is a POC. The public API may change as the spec and generator strategy evolve.
