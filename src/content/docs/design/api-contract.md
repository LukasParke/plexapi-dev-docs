---
title: API Contract
description: How PlexAPI.dev describes the Plex Media Server API as a machine-readable OpenAPI contract.
---

# Plex API Contract

## Decision: OpenAPI 3.1

PlexAPI.dev will describe the Plex Media Server HTTP API as a curated, versioned [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0.html) contract. This decision is aligned with the [SDK generation strategy](./sdk-generation-strategy), which calls for a single source of truth that feeds both reference documentation and future SDK generation.

### Why OpenAPI 3.1

| Consideration | Rationale |
|---------------|-----------|
| **Tooling maturity** | OpenAPI 3.1 is supported by Swagger Parser, OpenAPI Generator, Spectral, and many documentation generators. |
| **JSON Schema alignment** | OpenAPI 3.1 schemas are valid JSON Schema 2020-12 drafts, making it easy to reuse models for validation and SDK types. |
| **SDK generation** | OpenAPI Generator and Microsoft Kiota both consume OpenAPI 3.1, matching our hybrid SDK strategy. |
| **Documentation generation** | Reference pages can be generated or hand-written from the same contract, keeping docs and code in sync. |

### Why not JSON Schema alone

JSON Schema is excellent for validating request/response payloads, but it cannot describe HTTP paths, methods, parameters, authentication, or server URLs. OpenAPI is a superset that provides all of those capabilities while still using JSON Schema for models.

### Why not OpenAPI 3.0

OpenAPI 3.1 resolves long-standing mismatches with JSON Schema (nullable, `oneOf`, `anyOf`, default values) and is the version recommended for new contracts. Staying on 3.1 avoids a future migration when generators and validators drop 3.0 support.

## Contract location

The canonical contract lives at:

```text
spec/plex-media-server.openapi.json
```

This file is the single source of truth. Reference docs under `src/content/docs/reference/` are derived from it, and SDK generators will consume it directly.

## Scope

The contract currently covers the most-used Plex endpoints:

- **Server** — identity (`/identity`) and server info (`/`)
- **Library** — sections (`/library/sections`), items (`/library/sections/{sectionKey}/all`), refresh (`POST /library/sections/{sectionKey}/refresh`), and section search (`/library/sections/{sectionKey}/search`)
- **Metadata** — item details (`/library/metadata/{ratingKey}`) and children (`/library/metadata/{ratingKey}/children`)
- **Playlists** — playlists (`/playlists`) and playlist items (`/playlists/{playlistKey}/items`)
- **Hub** — global search (`/hubs/search`)
- **Sessions** — active playback sessions (`/status/sessions`)

Each operation includes:

- Operation ID, summary, and description
- Path, query, and header parameters
- Response schemas for JSON payloads
- Security requirements (`X-Plex-Token` header)

## Versioning

The contract follows SemVer-like `major.minor.patch` versioning in `info.version`:

- **Major** — breaking path, parameter, or schema changes.
- **Minor** — additive endpoints or fields.
- **Patch** — corrections, clarifications, or non-breaking fixes.

The current version is **0.1.0**.

## Validation

The contract is validated on every change via `pnpm run spec:validate`. The validator checks:

- JSON syntax
- OpenAPI 3.1 structural correctness
- All `$ref` targets resolve
- At least one path and one schema are defined

## Security notes

- The contract declares `X-Plex-Token` as an `apiKey` security scheme.
- Token values are never included in the spec or generated examples.
- Examples and guides instruct users to load tokens from environment variables or secure configuration.

## Future work

- Expand coverage to playback control, transcoding, collections, and Plex.tv account endpoints.
- Add `x-plex-api-since` and `x-plex-api-deprecated` extensions to track Plex server version compatibility.
- Introduce Spectral linting rules for Plex-specific conventions.
- Add example payloads and recorded-response validation for each endpoint.
