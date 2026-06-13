# Contributing to the Docs

This documentation site uses [VitePress](https://vitepress.dev/). Content is written in Markdown and lives in the `docs/` directory.

## Local setup

Install dependencies:

```bash
npm install
```

Start the development server with hot reload:

```bash
npm run docs:dev
```

The site will be available at `http://localhost:5173` by default.

## Adding a page

1. Create a new `.md` file under `docs/`.
2. Add a front matter block with a `title`:

```md
---
title: My New Page
---

# My New Page

Your content here.
```

3. Link the page from `docs/.vitepress/config.mjs` by adding it to the appropriate sidebar section.
4. Verify the page renders locally with `npm run docs:dev`.

## Build and preview

Before submitting changes, confirm the production build succeeds:

```bash
npm run docs:build
npm run docs:preview
```

The build output is placed in `docs/.vitepress/dist/`.

## Content style rules

- **Sentence case for headings.** Use "Quick start", not "Quick Start".
- **Write for the reader.** Start each guide with what the reader will accomplish and what they need first.
- **Keep examples copy-pasteable.** Provide complete commands and include placeholders like `<your-token>` where sensitive data belongs.
- **No real credentials.** Never include real Plex tokens, server addresses, or user metadata in examples or screenshots.
- **Use relative links for internal pages.** For example, use `/guide/quick-start` or `../reference/` instead of absolute URLs.
- **Prefer the `X-Plex-Token` header.** Do not show tokens as query parameters unless the example specifically explains query-parameter usage.
- **One sentence per line in source Markdown.** This makes diffs easier to read and review.
- **Use American English spelling** and avoid jargon where possible.
- **Check the build.** `npm run docs:build` validates internal links; dead links will fail CI.

## Review process

1. Open a pull request with a clear summary of the change.
2. Ensure the CI check `docs:build` passes.
3. Address reviewer feedback and keep the scope focused.
