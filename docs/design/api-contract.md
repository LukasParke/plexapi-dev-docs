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

## Contract location

The canonical contract lives at:

```text
spec/plex-media-server.openapi.json
```

This file is the single source of truth. Reference docs under `docs/reference/` are derived from it, and SDK generators will consume it directly.

## Validation

The contract is validated on every change via `npm run spec:validate`.

## Security notes

- The contract declares `X-Plex-Token` as an `apiKey` security scheme.
- Token values are never included in the spec or generated examples.
- Examples and guides instruct users to load tokens from environment variables or secure configuration.
