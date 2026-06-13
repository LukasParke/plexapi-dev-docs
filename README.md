# PlexAPI.dev

Developer documentation, SDKs, and the canonical OpenAPI spec for the Plex Media
Server API ecosystem.

## Repository layout

```
.
├── docs/                        # VitePress documentation site (plexapi.dev)
├── spec/                        # Canonical OpenAPI spec for Plex Media Server
│   └── plex-media-server.openapi.json
├── sdks/                        # Language SDK packages
│   ├── typescript/              # @plexapi/sdk
│   ├── python/                  # plexapi-sdk
│   └── go/                      # github.com/plexapi/plexapi-go
├── scripts/                     # Shared spec validation and reference generation
└── .github/workflows/           # CI/CD
```

## Quick start

This repository uses [pnpm](https://pnpm.io/) workspaces and [Turborepo](https://turbo.build/).

```bash
pnpm install
pnpm spec:validate
pnpm sdk:build
```

## Documentation site

```bash
pnpm docs:dev
```

Open `http://localhost:5173` to preview the site.

## SDK packages

| Language | Package | Status |
|----------|---------|--------|
| TypeScript/JavaScript | [`@plexapi/sdk`](./sdks/typescript) | Proof of concept |
| Python | [`plexapi-sdk`](./sdks/python) | Placeholder |
| Go | [`github.com/plexapi/plexapi-go`](./sdks/go) | Placeholder |

## Canonical OpenAPI spec

`spec/plex-media-server.openapi.json` is the single source of truth for the API
contract consumed by the SDK generator and the documentation site.

- Validate it with `pnpm spec:validate`.
- Regenerate the endpoints reference with `pnpm spec:generate-reference`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
