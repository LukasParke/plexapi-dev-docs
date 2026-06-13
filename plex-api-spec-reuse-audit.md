# PlexAPI.dev Reuse Strategy Audit: `LukasParke/plex-api-spec` and Generated SDKs

> **Scope:** Evaluate whether PlexAPI.dev should reuse, fork, or replace the community `plex-api-spec` OpenAPI contract and the Speakeasy-generated SDKs already published from it.  
> **Audited on:** 2026-06-12  
> **Issue:** [PLE-20](/PLE/issues/PLE-20)

---

## 1. Executive summary

The external `LukasParke/plex-api-spec` repository is already a mature, community-maintained OpenAPI 3.1.1 contract for Plex Media Server. It is **two orders of magnitude larger** than our internal draft (196 paths / 241 operations vs. 5 paths) and is the source of truth for the SDKs and docs currently linked from `plexapi.dev`.

**Recommendation:** PlexAPI.dev should treat `LukasParke/plex-api-spec` as the upstream canonical spec, contribute improvements back to it, and **not** rebuild a parallel spec from scratch. For SDKs, the fastest, lowest-debt path is to adopt the existing Speakeasy-generated SDKs as the machine-generated core and ship PlexAPI.dev-branded ergonomic wrappers around them. This preserves our “hybrid generated + hand-written” strategy while leveraging a large body of already-working code.

---

## 2. External spec audit — `LukasParke/plex-api-spec`

| Attribute | Finding |
|-----------|---------|
| Repository | `https://github.com/LukasParke/plex-api-spec` |
| Author | Luke Parke / LukeHagar (the same community that already powers `plexapi.dev`) |
| OpenAPI version | `3.1.1` |
| Spec version | `1.1.1` |
| Repo license | MIT |
| `info.license` in spec | Claims Apache 2.0 — **discrepancy with repo `LICENSE`** (likely stale metadata) |
| Format | Single YAML file (`plex-api-spec.yaml`) |
| Lines | ~17,000 |
| Servers | 3 templated URLs (`plex.direct`, `{protocol}://{host}:{port}`, `{full_server_url}`) |
| Paths | **196** |
| Operations | **241** |
| Schemas | **51** |
| Parameters | **50** |
| Tags | 28 domain groups (Activities, Butler, Collections, Content, Devices, Download Queue, DVRs, EPG, Events, General, Hubs, Library, Library Collections, Library Playlists, Live TV, Log, Play Queue, Playlist, Plex, Preferences, Provider, Rate, Search, Status, Subscriptions, Timeline, Transcoder, UltraBlur, Updater) |
| Generator tie-in | Speakeasy (`x-speakeasy-globals`, `.speakeasy/workflow.yaml`, `.speakeasy/lint.yaml`) |
| Automation | Hourly GitHub Actions generation via `speakeasy-api/sdk-generation-action` |
| Docs link | README points to `https://plexapi.dev` |

### Coverage compared to our internal draft

Our internal `spec/plex-media-server.openapi.json` covers only:

- `GET /identity`
- `GET /`
- `GET /library/sections`
- `GET /library/sections/{sectionKey}/all`
- `GET /status/sessions`

The external spec covers the same surface plus libraries, collections, playlists, play queues, transcoder, DVR/EPG, Live TV, status/sessions/history, users, preferences, updater, butler, events (SSE/WebSocket), log, search, hubs, ultra-blur, and more.

### Validation note

Running our internal Swagger Parser validator against the external spec produces errors about server variables having “unevaluated properties.” This is almost certainly a **validator/schema-version mismatch** (Swagger Parser’s OpenAPI 3.1 support vs. Speakeasy-flavored 3.1.1) rather than a broken spec, because Speakeasy successfully consumes the file. We should add `spectral` or Speakeasy’s own linter to our CI before using it as a canonical source.

---

## 3. Generated SDK audit — existing LukeHagar/LukasParke SDKs

The spec README lists eight language SDKs generated from the contract via Speakeasy. Three Phase-1 languages were inspected in depth.

### 3.1 TypeScript / JavaScript — `@lukehagar/plexjs`

| Attribute | Finding |
|-----------|---------|
| Repository | `LukeHagar/plexjs` (README also lists `LukasParke/plexjs`) |
| Package | `@lukehagar/plexjs` on npm; also mirrored on JSR |
| Version audited | `0.45.3` |
| License | MIT |
| Generator | Speakeasy |
| Size | ~1,600 tracked files (generated) |
| Features | Resource-oriented client, standalone tree-shakable functions, typed errors, retries, server selection, custom `HTTPClient`, auth via `token`, Zod runtime validation |

The README is comprehensive and the SDK is production-grade beta. It exposes all 241 methods grouped by the same tags as the spec.

### 3.2 Python — `plex-api-client`

| Attribute | Finding |
|-----------|---------|
| Repository | `LukeHagar/plexpy` |
| Package | `plex-api-client` on PyPI |
| Version audited | `0.34.3` |
| License | MIT |
| Generator | Speakeasy |
| Size | ~1,500 tracked files |
| Features | Sync + async `httpx` clients, Pydantic models, typed errors, retries, server selection, custom HTTP client, context-manager lifecycle |

Requires Python ≥3.10. Docs/examples mirror the TypeScript SDK structure.

### 3.3 Go — `github.com/LukeHagar/plexgo`

| Attribute | Finding |
|-----------|---------|
| Repository | `LukeHagar/plexgo` |
| Module | `github.com/LukeHagar/plexgo` |
| Go version | 1.22 |
| License | MIT |
| Generator | Speakeasy |
| Size | ~1,550 tracked files |
| Features | Option-pattern constructor, retry config, custom `HTTPClient` interface, typed SDK errors, `types.Date` helpers, server selection |

### 3.4 Other languages

The same spec also generates Ruby, Swift, PHP, Java, and C# SDKs under the `LukeHagar` namespace. All are Speakeasy-generated and share the same operation coverage and lifecycle.

### 3.5 SDK maturity assessment

| Strength | Concern |
|----------|---------|
| Very broad endpoint coverage | Beta status; breaking changes possible between minors |
| Idiomatic, feature-rich generated code (retries, errors, auth, server selection) | Published under personal (`LukeHagar`) namespaces, not `plexapi` |
| MIT licensed — reusable and forkable | Tightly coupled to Speakeasy toolchain |
| Active automation (hourly regeneration) | Version numbers differ by language, so compatibility matrix must be per-package |

---

## 4. Internal assets audit — PlexAPI.dev today

| Asset | Status | Notes |
|-------|--------|-------|
| `spec/plex-media-server.openapi.json` | Valid OpenAPI 3.1.0, but only 5 paths / 15 schemas / 3 tags | Far behind external spec |
| `sdk-generation-strategy.md` | Draft v1.0 | Proposes hybrid OpenAPI Generator + hand-written wrappers |
| `sdks/typescript` | POC | `openapi-typescript` types + hand-written resource layer; references `../../schemas/...` which does not exist |
| `sdks/python` | Placeholder | Package skeleton only |
| `sdks/go` | Placeholder | Module skeleton only |
| Docs site | Mixed VitePress/Starlight state | Per [ROADMAP.md](/PLE/issues/PLE-2) |

Conclusion: our internal SDK effort has not yet produced a working generated layer. Reaching parity with the external SDKs from scratch would take several engineer-weeks per language.

---

## 5. Reuse strategy options

### Option A — Adopt upstream spec + wrap existing SDKs (recommended)

1. Treat `LukasParke/plex-api-spec` as the canonical OpenAPI contract.
2. Add it as a tracked dependency (git submodule, vendored copy, or registry fetch from Speakeasy).
3. Stop expanding `spec/plex-media-server.openapi.json`; replace or source from upstream.
4. Build PlexAPI.dev-branded SDKs (`@plexapi/sdk`, `plexapi-sdk`, `github.com/plexapi/plexapi-go`) as **thin ergonomic wrappers** over the existing Speakeasy-generated packages.
5. Add Plex-specific helpers (token-safe config, resource-oriented fluent APIs, compatibility matrix, retry defaults tuned for local media servers).

**Why this is best now:**

- **API-first design:** We align with a single, richer source of truth instead of duplicating it.
- **SDK ergonomics:** We keep the hand-written “Plex feels like Plex” layer while not rewriting 241 operations per language.
- **Technical debt vs velocity:** We trade the small dependency on upstream packages for months of generated-client work.
- **Open-source community health:** We can upstream fixes and improvements instead of fragmenting the ecosystem.

### Option B — Adopt upstream spec, self-generate SDKs

Use the external spec as the canonical contract but generate our own SDKs with OpenAPI Generator (per the current strategy) or with Speakeasy under our own account/namespace.

**When to consider:** If branding/namespace control or Speakeasy cost becomes a blocker. The cost is a much larger initial engineering investment and ongoing template maintenance.

### Option C — Continue internal spec + SDKs from scratch

Keep growing `spec/plex-media-server.openapi.json` and generate SDKs from it.

**Verdict:** Not recommended. The external spec is already more complete, maintained, and tied to the same `plexapi.dev` community. Continuing separately would create a fragmented, second-class contract.

---

## 6. Recommended implementation path

If the board confirms Option A, the next concrete steps are:

1. **Spec integration** — add `LukasParke/plex-api-spec` to the repo as a tracked source and remove/deprecate the internal 5-path draft.
2. **Validation pipeline** — add a linter (`spectral`, Speakeasy CLI, or `openapi-generator` validate) that passes against the upstream spec.
3. **TypeScript wrapper** — evolve `sdks/typescript` from its current hand-written POC into a wrapper over `@lukehagar/plexjs`, exposing `PlexApiClient` with resource helpers while hiding Speakeasy-specific constructor noise.
4. **Python wrapper** — build `plexapi-sdk` as a wrapper over `plex-api-client`.
5. **Go wrapper** — build `github.com/plexapi/plexapi-go` as a wrapper over `github.com/LukeHagar/plexgo`.
6. **Docs & compatibility matrix** — generate/reference API docs from the upstream spec and publish a per-package compatibility table.
7. **Upstream contributions** — open issues/PRs for any inaccuracies we find in the spec so the whole community benefits.

---

## 7. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Upstream spec changes break our wrappers | Pin to a released spec version; run wrapper tests on every spec update |
| Speakeasy-generated SDKs have breaking minors while in beta | Pin dependency versions; wrap constructors so users consume a stable PlexAPI.dev API |
| Branding/namespaces confuse users | Publish under `plexapi-*` namespaces; upstream repos remain credited in READMEs |
| License metadata mismatch in the spec | Confirm with upstream author; use repo MIT license for SDK reuse; keep attribution |
| Speakeasy lock-in / future cost | Spec remains portable OpenAPI; we can switch to OpenAPI Generator or self-host generation later without user-facing breakage |
| Inaccuracies in undocumented endpoints | Use our test Plex servers + recorded fixtures to validate; feed fixes upstream |

---

## 8. Decision requested

**Approve Option A:** adopt `LukasParke/plex-api-spec` as the canonical OpenAPI contract and build PlexAPI.dev SDKs as ergonomic wrappers around the existing Speakeasy-generated SDKs.

If approved, I will create child issues for spec integration, validation pipeline, and the TypeScript/Python/Go wrapper packages.
