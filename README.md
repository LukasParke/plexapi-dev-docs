# PlexAPI.dev Docs

Developer documentation site for [PlexAPI.dev](https://plexapi.dev), built with [VitePress](https://vitepress.dev/).

## Quick start

```bash
npm install
npm run docs:dev
```

Open `http://localhost:5173` to preview the site.

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run docs:dev` | Start local development server |
| `npm run docs:build` | Build static site for production |
| `npm run docs:preview` | Preview the production build locally |
| `npm run spec:validate` | Validate the OpenAPI spec |
| `npm run spec:generate-reference` | Regenerate `docs/reference/endpoints.md` from the spec |

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
│   └── plex-media-server.openapi.json
├── scripts/                # Spec validation and reference generation
├── package.json
└── README.md
```

## Contributing

See [docs/contributing.md](./docs/contributing.md) for content authoring guidelines.

## Deployment

See [docs/deploy.md](./docs/deploy.md) for the current deploy target and hosting strategy.
