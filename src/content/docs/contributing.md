---
title: Contributing
description: How to add or edit content on PlexAPI.dev Docs.
---

# Contributing to the Docs

This documentation site uses [Starlight](https://starlight.astro.build/). Content is written in Markdown and MDX and lives in `src/content/docs/`.

## Local setup

This repo uses [pnpm](https://pnpm.io/) workspaces. Install dependencies from the repo root:

```bash
pnpm install
```

Start the development server with hot reload:

```bash
pnpm run docs:dev
```

The site will be available at `http://localhost:4321` by default.

## Adding a page

1. Create a new `.md` or `.mdx` file under `src/content/docs/`.
2. Add a front matter block with a `title`:

```md
---
title: My New Page
---

# My New Page

Your content here.
```

3. The page is automatically added to the sidebar based on its directory. To customize sidebar order, edit `astro.config.mjs`.
4. Verify the page renders locally with `pnpm run docs:dev`.

## Editing an existing page

1. Open the relevant `.md` or `.mdx` file in `src/content/docs/`.
2. Make your changes.
3. Preview them with `pnpm run docs:dev`.

## Build and preview

Before submitting changes, confirm the production build succeeds:

```bash
pnpm run docs:build
pnpm run docs:preview
```

The build output is placed in `dist/`.

## Content style rules

- **Sentence case for headings.** Use "Quick start", not "Quick Start".
- **Write for the reader.** Start each guide with what the reader will accomplish and what they need first.
- **Keep examples copy-pasteable.** Provide complete commands and include placeholders like `<your-token>` where sensitive data belongs.
- **No real credentials.** Never include real Plex tokens, server addresses, or user metadata in examples or screenshots.
- **Use relative links for internal pages.** For example, use `/guides/quick-start/` or `../reference/` instead of absolute URLs.
- **Prefer the `X-Plex-Token` header.** Do not show tokens as query parameters unless the example specifically explains query-parameter usage.
- **One sentence per line in source Markdown.** This makes diffs easier to read and review.
- **Use American English spelling** and avoid jargon where possible.
- **Check the build.** `pnpm run docs:build` validates internal links; dead links will fail CI.

## Review process

1. Open a pull request with a clear summary of the change.
2. Ensure the CI build passes.
3. Address reviewer feedback and keep the scope focused.
