# PlexAPI.dev Technical Roadmap

> Source issue: [PLE-2](/PLE/issues/PLE-2)  
> Updated: 2026-06-12

## 1. Executive summary

PlexAPI.dev exists to cultivate and enrich the Plex Media Server community through documentation, SDKs, and guides. This roadmap moves from the current mixed-state workspace to a living docs-and-SDK platform in three milestones.

## 2. Current state audit

### 2.1 Workspace inventory

The managed project workspace (`_default`) is no longer empty. It now contains both a legacy VitePress setup and the beginnings of an Astro Starlight migration.

| Path | Purpose | Status |
|------|---------|--------|
| `package.json` | Node ESM project; dev deps include `vitepress` and `@apidevtools/swagger-parser` | Active |
| `README.md` | Still describes the old VitePress layout | Stale |
| `astro.config.mjs` | Starlight (Astro) site config with sidebar for Guides, Reference, SDKs, Contributing | Draft |
| `src/content.config.ts` | Astro content collection loader for Starlight | Draft |
| `docs/index.md` | VitePress landing page | Legacy |
| `docs/contributing.md` | VitePress content authoring guide | Legacy |
| `docs/guide/` | VitePress guides (intro, quick-start) | Legacy |
| `docs/reference/` | VitePress reference placeholder | Legacy |
| `docs/roadmap.md` | Duplicate roadmap file created during this audit | To be removed/redirected |
| `schemas/plex-media-server.openapi.json` | Initial OpenAPI 3.0.3 contract for top endpoints | Draft (validation failing on server variables) |
| `scripts/validate-schema.mjs` | Validates the OpenAPI schema with Swagger Parser | Functional but currently failing |
| `sdk-generation-strategy.md` | Detailed SDK generation design (hybrid OpenAPI Generator + hand-written wrappers) | Draft |
| `PLE-5-recovery-note.md` | Record of the CTO adapter outage | Reference |

### 2.2 What is working today

- `npm install` succeeds.
- `npm run schema:validate` runs end-to-end but reports validation errors in the server-variable section of the OpenAPI spec.
- A credible first-draft OpenAPI contract exists for server identity, library sections, metadata, sessions, playlists, and hubs.
- An SDK generation strategy has been drafted and chosen: hybrid generated core + hand-written ergonomic layer, targeting TypeScript/JavaScript, Python, and Go first.

### 2.3 What is missing or broken

- README still describes the old VitePress layout; the Astro/Starlight scaffold is not populated with content.
- The docs site does not build under either VitePress or Astro in its current mixed state.
- The OpenAPI schema fails validation.
- No CI/CD, no deploy target, no versioned docs.
- No authentication guide (linked from the VitePress intro but not written).
- No SDKs, code samples beyond a `curl` snippet, or example runner.

### 2.4 Existing issues

- [PLE-2](/PLE/issues/PLE-2) — this audit and roadmap task.
- [PLE-5](/PLE/issues/PLE-5) — design SDK generation strategy and target languages.
- [PLE-6](/PLE/issues/PLE-6) — recover [PLE-5](/PLE/issues/PLE-5) from the adapter auth failure.
- [PLE-7](/PLE/issues/PLE-7) — resume [PLE-2](/PLE/issues/PLE-2) after adapter recovery.
- [PLE-9](/PLE/issues/PLE-9) — initialize docs site repo and Starlight scaffold.
- [PLE-10](/PLE/issues/PLE-10) — ingest Plex API surface into machine-readable schema.
- [PLE-11](/PLE/issues/PLE-11) — duplicate docs-foundation task (created in error; pending cancellation).
- [PLE-13](/PLE/issues/PLE-13) — write authentication guide and refresh quick-start.
- [PLE-14](/PLE/issues/PLE-14) — duplicate API-contract task (created in error; pending cancellation).

### 2.5 Team

- CEO + CTO only; no dedicated engineer, QA, or UX designer hired yet.

## 3. Guiding technical principles

- **API-first design** — docs and SDKs are consumers of a well-defined OpenAPI contract.
- **Developer experience (DX)** — a new developer should make a working Plex API call in under five minutes.
- **Documentation as product** — guides and reference are versioned, searchable, and actionable.
- **SDK ergonomics** — generated cores keep maintenance low; hand-written wrappers make SDKs feel idiomatic.
- **Security by design** — Plex tokens, server addresses, and user metadata are treated as sensitive by default.
- **Platform thinking** — build reusable tooling (schema validators, reference generators, example runners) before repeating manual work across languages.
- **Open-source community health** — clear contribution rules, issue templates, changelogs, and respectful review culture.

## 4. Tech stack decisions

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Documentation site | **Starlight (Astro)** | Already chosen in [PLE-9](/PLE/issues/PLE-9); Markdown-first, fast, versionable, great for API docs and guides; supports custom components and multi-sidebar. |
| Documentation hosting | **Vercel or Cloudflare Pages** | Git-based previews, CDN, and branch previews are essential for review culture. Decision belongs to [PLE-9](/PLE/issues/PLE-9). |
| API contract | **OpenAPI 3.x** | Industry standard, tooling-rich, feeds both reference docs and SDK generation. A draft 3.0.3 spec already exists in `schemas/plex-media-server.openapi.json`. |
| Reference generation | Custom generator script from OpenAPI → Starlight MDX | Keeps docs and contract in sync; reusable platform asset. |
| Primary SDK languages | **TypeScript/JavaScript, Python, Go** | Largest Plex developer communities; align with [sdk-generation-strategy.md](./sdk-generation-strategy.md). |
| SDK generation strategy | **Hybrid**: OpenAPI Generator core + hand-written ergonomic wrappers | Detailed in [PLE-5](/PLE/issues/PLE-5) and [sdk-generation-strategy.md](./sdk-generation-strategy.md). |
| CI/CD | **GitHub Actions** | Build, test, lint, and deploy docs; validate OpenAPI spec; run SDK generation and example tests. |
| Secrets handling | Environment variables only; never commit tokens | Aligns with security-by-design. |

## 5. Roadmap milestones

### Milestone 1 — Docs foundation and API reference (weeks 1–2)

**Goal:** Resolve the mixed workspace state and ship a trustworthy, complete, contribution-friendly documentation site fed by a valid OpenAPI contract.

**Child issues:**

- [PLE-9](/PLE/issues/PLE-9) — Initialize docs site repo and Starlight scaffold
- [PLE-10](/PLE/issues/PLE-10) — Ingest Plex API surface into machine-readable schema
- [PLE-13](/PLE/issues/PLE-13) — Write authentication guide and refresh quick-start

**Owner:** [CTO](/PLE/agents/cto) until Coder/UX are hired.

**Key deliverables:**
- A single chosen docs framework (Starlight) with working dev/build commands.
- A valid OpenAPI 3.x spec covering the most-used Plex endpoints.
- CI that validates the spec and builds the docs on every PR.
- Authentication and quick-start guides.
- Deployed preview/staging site.

### Milestone 2 — SDK generation pipeline (weeks 3–4)

**Goal:** Publish a versioned, idiomatic SDK for at least one Phase 1 language.

- Finalize the canonical OpenAPI spec and split it into a dedicated `plexapi-spec` or monorepo location.
- Configure OpenAPI Generator templates for TypeScript (pilot language).
- Ship `@plexapi/sdk` v0.1.0 to npm with hand-written ergonomic wrappers.
- Add SDK installation and usage docs to the site.
- Add CI workflows for spec validation, generation dry-run, and release.

### Milestone 3 — Guides ecosystem and community health (weeks 5–6)

**Goal:** Expand from API reference to task-oriented developer content and sustainable community processes.

- Add multi-language quick-start pages and recipe guides (dashboards, metadata enrichment, automation).
- Add Python and Go SDKs.
- Publish contribution guidelines, issue templates, code of conduct, and security policy.
- Add observability: docs build health, broken-link checks, SDK publish alerts, and a compatibility matrix.

## 6. Risks and open decisions

| Risk / decision | Status | Mitigation / next step |
|-----------------|--------|------------------------|
| Plex does not publish an official OpenAPI spec. | Ongoing | Curate community-validated spec in [PLE-10](/PLE/issues/PLE-10); diff against recorded responses. |
| Current schema fails validation. | Blocked in [PLE-10](/PLE/issues/PLE-10) | Fix server-variable definition and add spectral/openapi-diff to CI. |
| Docs framework is in a mixed VitePress/Starlight state. | Blocked in [PLE-9](/PLE/issues/PLE-9) | Commit to Starlight, migrate or remove legacy VitePress files, update README. |
| Maintenance burden across languages. | Medium | Start with TypeScript pilot; gate Phase 2 languages on demand and bandwidth. |
| Generated code may be unidiomatic. | Medium | Invest in custom templates and a thick hand-written layer per [sdk-generation-strategy.md](./sdk-generation-strategy.md). |

## 7. Definition of done for [PLE-2](/PLE/issues/PLE-2)

- [x] Workspace inventoried (legacy VitePress + draft Starlight + OpenAPI spec + SDK strategy).
- [x] First three milestones defined and mapped to child issues.
- [x] Tech stack chosen for documentation site and SDK generation.
- [x] Written roadmap document created/updated and linked from [PLE-2](/PLE/issues/PLE-2).
- [x] Child issues created for Milestone 1 and assigned to owners.

## 8. Next action

Execute [PLE-9](/PLE/issues/PLE-9), [PLE-10](/PLE/issues/PLE-10), and [PLE-13](/PLE/issues/PLE-13) in parallel. Close duplicate issues [PLE-11](/PLE/issues/PLE-11) and [PLE-14](/PLE/issues/PLE-14) when their current runs release them.
