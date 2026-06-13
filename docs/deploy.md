# Deploy Target

The PlexAPI.dev documentation site is built as a static site by VitePress and is designed to be hosted on any static host with a CDN.

## Recommended hosts

| Host | Why it fits | Notes |
|------|-------------|-------|
| **Cloudflare Pages** | Generous free tier, branch previews, global CDN | Best choice once we need preview deployments for pull requests. |
| **GitHub Pages** | Free for public repos, integrated with GitHub Actions | Simplest path while the project is small. |
| **Vercel / Netlify** | Branch previews and analytics | Good alternatives if we need more workflow features later. |

## Current target

**Primary:** GitHub Pages from the `gh-pages` branch.

The site is built by GitHub Actions on every push to `main` and every pull request. Merges to `main` deploy the contents of `docs/.vitepress/dist/` to the `gh-pages` branch.

## Build output

```bash
npm run docs:build
```

Produces `docs/.vitepress/dist/`. This folder can be served by any static host.

## Domain

The canonical domain is `https://docs.plexapi.dev`. DNS and certificate setup are handled by the chosen hosting provider.

## Future work

- Add branch preview deployments for pull requests.
- Version the docs once multiple SDK versions need to be documented simultaneously.
