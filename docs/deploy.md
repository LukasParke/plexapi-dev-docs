# Deploy Target

The PlexAPI.dev documentation site is built as a static site by VitePress and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Current target

**Primary:** Cloudflare Pages (`plexapi-dev-docs`).

| Trigger | Deployment |
|---------|-----------|
| Push to `main` | Production deployment to the custom domain. |
| Pull request against `main` | Branch preview with a unique preview URL posted back to the PR. |

## Build output

```bash
npm run docs:build
```

Produces `docs/.vitepress/dist/`. Cloudflare Pages serves the contents of this directory.

## Required repository secrets

Configure these in **Settings → Secrets and variables → Actions**:

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with **Cloudflare Pages:Edit** permission for the target account. |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID that owns the Pages project. |

## Cloudflare Pages project settings

| Setting | Value |
|---------|-------|
| Project name | `plexapi-dev-docs` |
| Production branch | `main` |
| Build output directory | `docs/.vitepress/dist` |

To use a different project name, update the `CF_PAGES_PROJECT` environment variable in `.github/workflows/ci.yml`.

## Static file headers

The `docs/public/_headers` file applies security and cache-control headers to the deployed site:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Long-term caching for hashed assets under `/assets/*`.

## Manual deployment

With [Wrangler](https://developers.cloudflare.com/workers/wrangler/) installed and authenticated:

```bash
npm run docs:build
npx wrangler pages deploy docs/.vitepress/dist --project-name=plexapi-dev-docs --branch=main
```

## Domain

The canonical domain is `https://docs.plexapi.dev`. DNS and certificate setup are handled in the Cloudflare Pages dashboard.

## Future work

- Version the docs once multiple SDK versions need to be documented simultaneously.
