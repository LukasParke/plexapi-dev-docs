# PlexAPI.dev Docs

Developer documentation site for [PlexAPI.dev](https://plexapi.dev), built with [VitePress](https://vitepress.dev/).

## Quick start

This repository uses [pnpm](https://pnpm.io/) workspaces.

```bash
pnpm install
pnpm docs:dev
```

Open `http://localhost:5173` to preview the site.

## Available scripts

| Script | Description |
|--------|-------------|
| `pnpm docs:dev` | Start local development server |
| `pnpm docs:build` | Build static site for production |
| `pnpm docs:preview` | Preview the production build locally |
| `pnpm spec:validate` | Validate the OpenAPI spec |
| `pnpm spec:lint` | Lint the OpenAPI spec with Spectral |
| `pnpm spec:diff` | Dry-run breaking-change detection |
| `pnpm spec:generate-reference` | Regenerate `docs/reference/endpoints.md` from the spec |
| `pnpm sdk:generate` | Regenerate SDK types from the spec |
| `pnpm sdk:build` | Build all SDK packages |
| `pnpm sdk:test` | Run all SDK tests |

## Project layout

```
.
├── .github/workflows/      # CI checks
├── docs/
│   ├── .vitepress/         # VitePress theme and nav configuration
│   ├── guide/              # Developer guides
│   ├── reference/          # API reference
│   ├── design/             # Architecture and design docs
│   ├── public/             # Static assets
│   ├── index.md            # Landing page
│   ├── contributing.md     # How to add or edit content
│   └── deploy.md           # Deploy target documentation
├── spec/
│   └── plex-media-server.openapi.json   # canonical OpenAPI 3.1 contract
├── sdks/
│   ├── typescript/         # @plexapi/sdk
│   ├── python/             # plexapi-sdk
│   └── go/                 # github.com/plexapi/plexapi-go
├── scripts/                # Spec validation, lint, diff, and reference generation
├── package.json
└── README.md
```

## Contributing

See [docs/contributing.md](./docs/contributing.md) for content authoring guidelines.

## Deployment

The docs are deployed to **Cloudflare Pages** automatically via GitHub Actions. Production deploys run on every push to `main`, and pull requests receive a unique preview URL.

Required secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

See [docs/deploy.md](./docs/deploy.md) for full details.
