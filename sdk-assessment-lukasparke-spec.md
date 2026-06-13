# Assessment: SDKs and Repos Listed in `LukasParke/plex-api-spec`

**Issue:** [PLE-38](/PLE/issues/PLE-38)  
**Date:** 2026-06-13  
**Assessor:** CTO

## 1. Executive Summary

The community-maintained OpenAPI specification at [`LukasParke/plex-api-spec`](https://github.com/LukasParke/plex-api-spec) is the canonical source from which [PlexAPI.dev](https://plexapi.dev) documentation is generated and which currently drives **eight auto-generated Speakeasy SDKs** under the `LukeHagar` GitHub namespace.

This assessment evaluates the health, maturity, and strategic fit of those SDK repos for PlexAPI.dev's own SDK roadmap. The headline findings:

- **All eight SDKs are Speakeasy-generated** from the same OpenAPI spec, with automated generation workflows.
- **TypeScript (`plexjs`) is the most adopted** by a wide margin (51 stars, ~13.8k npm downloads in the trailing year).
- **Swift (`plexswift`) is archived** and effectively unmaintained.
- **Java (`plexjava`) ships without an open-source license**, creating a legal risk for adopters.
- **PHP (`plexphp`) and Ruby (`plexruby`) are stale**, with no code pushes since late 2025.
- **Python, Go, C#, TypeScript** are actively regenerated (last pushes in May 2026).

## 2. Source Spec Repo: `LukasParke/plex-api-spec`

| Attribute | Value |
|-----------|-------|
| URL | https://github.com/LukasParke/plex-api-spec |
| Description | A Plex Media Server OpenAPI Specification maintained by the community |
| License | MIT |
| Stars | 81 |
| Forks | 25 |
| Open Issues | 10 |
| Last Pushed | 2026-06-13 |
| Spec File | `plex-api-spec.yaml` (~669 KB) |
| Generator | Speakeasy (`.speakeasy/workflow.yaml`) |

The repo contains a single large OpenAPI 3.x YAML document plus a human-readable `description.md`. Speakeasy lint and workflow files indicate that SDK generation is orchestrated from this repo, not from each language repo independently.

## 3. SDK-by-SDK Assessment

Data collected via the GitHub REST API and npm registry on 2026-06-13.

| Language | Repo | Package | Stars | Forks | Open Issues | Last Pushed | Latest Release | License | Status |
|----------|------|---------|-------|-------|-------------|-------------|----------------|---------|--------|
| TypeScript | [plexjs](https://github.com/LukeHagar/plexjs) | `@lukehagar/plexjs` npm / JSR | 51 | 4 | 14 | 2026-06-12 | v0.44.1 (2025-12-01) | MIT | Active |
| Python | [plexpy](https://github.com/LukeHagar/plexpy) | `plex-api-client` PyPI | 28 | 2 | 4 | 2026-05-20 | v0.34.3 (2026-05-19) | MIT | Active |
| Go | [plexgo](https://github.com/LukeHagar/plexgo) | module | 35 | 8 | 4 | 2026-05-19 | v0.28.6 (2026-05-19) | MIT | Active |
| C# | [plexcsharp](https://github.com/LukeHagar/plexcsharp) | Releases only | 17 | 5 | 2 | 2026-05-19 | v0.20.8 (2026-05-19) | MIT | Active |
| Java | [plexjava](https://github.com/LukeHagar/plexjava) | Releases only | 15 | 1 | 3 | 2026-05-19 | v0.22.7 (2026-05-19) | **None** | Active but unlicensed |
| Ruby | [plexruby](https://github.com/LukeHagar/plexruby) | Releases only | 8 | 0 | 0 | 2026-05-18 | v0.17.1 (2025-09-16) | MIT | Stale release |
| PHP | [plexphp](https://github.com/LukeHagar/plexphp) | Releases only | 6 | 2 | 1 | 2025-10-12 | v0.14.13 (2025-09-16) | MIT | Stale |
| Swift | [plexswift](https://github.com/LukeHagar/plexswift) | Releases only | 15 | 8 | 1 | 2025-10-12 | v0.10.5 (2025-03-10) | MIT | **Archived** |

### 3.1 TypeScript (`plexjs`)
- **Adoption leader**: 51 stars; npm logged ~13,774 downloads in the trailing 12 months.
- **Workflow gap**: only `sdk_generation.yaml`; no automated `sdk_publish.yaml` observed in the repo contents sample.
- **Observation**: latest Git tag/release is from 2025-12-01, but the default branch was pushed in June 2026, suggesting either Speakeasy pushes directly to the repo without cutting releases, or releases are infrequent. This is a DX/docs concern.

### 3.2 Python (`plexpy`)
- **Healthy regeneration cadence**: latest release 2026-05-19, matching latest push.
- **Package name on PyPI**: `plex-api-client` (not `plexpy`).
- **Workflows**: generation + publish.

### 3.3 Go (`plexgo`)
- **Strongest relative interest after TypeScript**: 35 stars, 8 forks.
- **Well documented**: GoDoc link published.
- **Workflows**: generation + publish.

### 3.4 C# (`plexcsharp`)
- **Active** (May 2026 regeneration).
- **Lowest absolute adoption** among active repos (17 stars).

### 3.5 Java (`plexjava`)
- **Critical legal gap**: no `LICENSE` or `LICENSE.md` file in the default branch. GitHub API reports `license: null`.
- Active regeneration but **not safe to recommend** until a license is added.

### 3.6 Ruby (`plexruby`)
- **No open issues**, but latest release is from 2025-09-16 while branch was pushed 2026-05-18. Similar release/tag inconsistency as TypeScript.

### 3.7 PHP (`plexphp`)
- **Stale**: no pushes since 2025-10-12, no releases since 2025-09-16.
- Likely the lowest community priority.

### 3.8 Swift (`plexswift`)
- **Archived repository**; no ongoing generation.
- Deprecated in PlexAPI.dev SDK listings as of [PLE-41](/PLE/issues/PLE-41).

## 4. Generator / Maintenance Model

All sampled repos contain a `.speakeasy` directory and one or both of:
- `.github/workflows/sdk_generation.yaml`
- `.github/workflows/sdk_publish.yaml`

This confirms the **Speakeasy-managed generation model** documented in the source spec's README. Speakeasy provides:
- OpenAPI-driven code generation.
- Idiomatic language output.
- Automated publishing to npm/PyPI/etc.

The current PlexAPI.dev strategy (`sdk-generation-strategy.md`) proposes a **hybrid OpenAPI Generator + hand-written wrapper** model. The LukasParke repos represent a **competing/alternative production path** using Speakeasy exclusively.

## 5. Strategic Implications for PlexAPI.dev

### 5.1 What we can reuse
- **Spec**: `LukasParke/plex-api-spec` is the de-facto community OpenAPI spec. It is MIT-licensed and already powers live SDKs.
- **TypeScript SDK**: `plexjs` has proven adoption and could be adopted, forked, or renamed as the official PlexAPI.dev TypeScript SDK.
- **Generation infra**: Speakeasy workflows can be replicated or moved under the `PlexAPI.dev` org for governance.

### 5.2 Gaps vs. our strategy
| Our Strategy Goal | LukasParke Reality |
|-------------------|--------------------|
| Curated `plex-api-spec` repo | ✅ Exists and is active |
| Hybrid generated + hand-written layers | ❌ Fully generated today |
| Versioned compatibility matrix | ❌ Not published per SDK |
| Hand-written ergonomic wrappers | ❌ Not present |
| Security: token redaction, HTTPS defaults | ❌ Not assessed; would need audit |
| Phase 2 languages (Rust) | ❌ Rust SDK not listed |
| License clarity across all SDKs | ❌ Java is unlicensed |

### 5.3 Recommendations
1. **Resolve the Java license gap immediately** by opening an issue/PR against `LukeHagar/plexjava` to add an MIT `LICENSE` file, or exclude it from PlexAPI.dev recommendations until fixed.
2. **Deprecate/remove the Swift SDK** from any PlexAPI.dev SDK directory because the repo is archived (completed in [PLE-41](/PLE/issues/PLE-41)).
3. **Investigate the release/tag drift** in TypeScript and Ruby repos (branch pushed in 2026 but latest release from 2025). Decide whether PlexAPI.dev should pin to releases or to default-branch HEAD.
4. **Add a compatibility matrix** per SDK listing Plex server min/max versions, even if approximate.
5. **Evaluate Speakeasy as the primary generator** against the current strategy's OpenAPI Generator/Kiota evaluation. The existing repos are a ready-made pilot dataset.
6. **Consider consolidating** the most popular SDKs (`plexjs`, `plexpy`, `plexgo`) under the `PlexAPI.dev` GitHub org with hand-written ergonomic layers, while linking to community-maintained repos for the long tail.

## 6. Risk Summary

| Risk | Severity | Owner / Next Step |
|------|----------|-------------------|
| `plexjava` has no license | High | Contact maintainer or open PR; do not endorse until resolved |
| `plexswift` archived, still listed | Medium | Deprecated in PlexAPI.dev SDK listings ([PLE-41](/PLE/issues/PLE-41)); remove row once the directory is regenerated |
| PHP/Ruby stale releases | Medium | Audit whether they still compile against latest spec |
| Release/tag drift (TS, Ruby) | Low-Medium | Document expected install source (release vs. HEAD) |
| No compatibility matrix | Low | Add to docs roadmap |

## 7. Verification Evidence

- GitHub API metadata and release lists fetched 2026-06-13 for all eight `LukeHagar/plex*` repos.
- npm download data for `@lukehagar/plexjs` shows ~13,774 downloads in the trailing year.
- Direct HEAD checks confirm `LukeHagar/plexjava` has no `LICENSE` or `LICENSE.md` file.
- Source spec repo confirms Speakeasy-driven generation via `.speakeasy/workflow.yaml`.
