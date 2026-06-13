# PlexAPI.dev

Developer documentation, SDKs, and the canonical OpenAPI spec for the Plex Media
Server API ecosystem.

## Repository layout

```
.
├── src/                         # Starlight (Astro) documentation site (plexapi.dev)
├── spec/                        # Canonical OpenAPI spec for Plex Media Server
│   └── plex-media-server.openapi.json
├── sdks/                        # Language SDK packages
│   └── typescript/              # @plexapi/sdk
├── scripts/                     # Shared spec validation and reference generation
└── .github/workflows/           # CI/CD
```

## Quick start

This repository uses [pnpm](https://pnpm.io/) workspaces.

```bash
pnpm install
pnpm run docs:dev
```

## Available scripts

| Script | Description |
|--------|-------------|
| `pnpm run docs:dev` | Start the docs development server |
| `pnpm run docs:build` | Build the static docs site |
| `pnpm run docs:preview` | Preview the production docs build |
| `pnpm run spec:validate` | Validate the OpenAPI spec |
| `pnpm run spec:generate-reference` | Regenerate `src/content/docs/reference/endpoints.md` |

## Contributing

See [src/content/docs/contributing.md](./src/content/docs/contributing.md).
