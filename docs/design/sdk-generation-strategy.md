---
title: SDK Generation Strategy
description: How PlexAPI.dev will produce, publish, and maintain SDKs for the Plex Media Server API.
---

# PlexAPI.dev SDK Generation Strategy

## Status
Draft v1.0 — ready for technical review and implementation planning.

## Objective
Define how [PlexAPI.dev](https://plexapi.dev) will produce, publish, and maintain idiomatic software development kits (SDKs) for the Plex Media Server API.

## Decision summary

| Dimension | Decision |
|-----------|----------|
| **Approach** | **Hybrid**: OpenAPI-generated core clients + hand-written ergonomic wrappers, resource models, and helpers. |
| **Spec source** | Maintain a curated, versioned OpenAPI 3.1 description of the Plex Media Server API and Plex.tv account endpoints. |
| **Primary generator** | **OpenAPI Generator** for the initial multi-language rollout; evaluate **Microsoft Kiota** and **Speakeasy** as the platform matures. |
| **Target languages (phase 1)** | TypeScript/JavaScript, Python, Go |
| **Target languages (phase 2)** | C#, Java, Ruby, Rust, PHP |
| **Release/versioning** | Independent SemVer per SDK; compatibility matrix maps SDK versions to Plex server versions. |
| **Distribution** | Language-native package managers (npm, PyPI, Go modules, NuGet, Maven, etc.). |
| **License** | MIT (community-friendly, permissive). |

---

## 1. Background and constraints

Plex Media Server exposes a rich HTTP/XML/JSON API, but it is not officially documented as a machine-readable contract. The PlexAPI.dev site already captures endpoints, parameters, and response shapes. Turning that knowledge into reliable SDKs requires:

1. A single source of truth for the API contract.
2. A generator toolchain that can target multiple languages without rewriting each SDK from scratch.
3. Idiomatic, hand-finished layers on top of generated code so each SDK feels native.
4. Automated pipelines that regenerate clients when the contract changes.
5. Clear versioning so users know which SDK works with which Plex server release.

### Non-goals for this design
- Rebuilding the Plex Media Server itself.
- Supporting every programming language immediately.
- Guaranteeing 100 % feature parity with every undocumented/private endpoint on day one.

---

## 2. Target languages

### Phase 1 — launch languages

These languages cover the largest Plex developer communities and existing tooling:

| Language | Rationale | Existing ecosystem signal |
|----------|-----------|---------------------------|
| **Python** | Dominant Plex automation community (`python-plexapi`, `Tautulli`, custom scripts). | High |
| **TypeScript / JavaScript** | Web apps, Node automation, browser extensions, modern UI frameworks. | High |
| **Go** | CLI tools, server-side integrations, infrastructure projects, binary distribution. | Medium-High |

### Phase 2 — expansion languages

| Language | Rationale |
|----------|-----------|
| **C# / .NET** | Windows ecosystem, media center integrations, game modding. |
| **Java** | Enterprise/media management backends, Android-adjacent tooling. |
| **Ruby** | Home automation and scripting community. |
| **Rust** | Performance-sensitive CLI/tools, cross-platform binaries. |
| **PHP** | Web hosting ecosystem, WordPress/plugins. |

### Selection criteria

1. **Community size** in the Plex / media-server / home-automation space.
2. **Package-manager maturity** and discoverability.
3. **Generator support** in the chosen toolchain.
4. **Maintenance bandwidth** — each language adds CI, release, and support cost.
5. **Strategic value** for partners and integrations.

---

## 3. Generated vs. hand-written vs. hybrid

### Option A — fully hand-written
- **Pros** perfect ergonomics, full control.
- **Cons** unsustainable across 5+ languages; every endpoint change must be manually ported.
- **Verdict** rejected for core clients.

### Option B — fully generated
- **Pros** fast propagation of API changes, broad language coverage.
- **Cons** generated code is often unidiomatic, lacks helper methods, error context, and resource-oriented abstractions.
- **Verdict** rejected as the user-facing surface.

### Option C — hybrid (selected)
- **Generated layer** (`plexapi-{lang}-generated` or internal package) handles HTTP transport, serialization, request/response models, and authentication headers from the OpenAPI spec.
- **Hand-written layer** (`plexapi-{lang}`) provides:
  - Resource-oriented fluent interfaces (e.g., `client.libraries.movies()`).
  - Convenience methods for common workflows (search, playback, transcoding).
  - Retry, rate-limit, and connection-pool defaults tuned for Plex.
  - Token-safe credential helpers and configuration builders.
  - Idiomatic error types and documentation.
- **Verdict** selected. It balances velocity with developer experience.

---

## 4. OpenAPI contract and parser toolchain

### Spec curation

1. Create a `plex-api-spec` repository containing one canonical OpenAPI 3.1 document.
2. Document endpoints already covered on PlexAPI.dev plus high-value undocumented endpoints validated by the community.
3. Tag each operation with `x-plex-api-since` (server version introduced) and `x-plex-api-deprecated` where applicable.
4. Add `x-plex-resource` tags to group endpoints by domain (Library, Server, Sessions, Playlists, etc.).

### Parser / generator options

| Tool | Strengths | Concerns |
|------|-----------|----------|
| **OpenAPI Generator** | Mature, 50+ languages, active community, customizable templates. | Templates vary in quality; requires tuning for idiomatic output. |
| **Microsoft Kiota** | Clean abstraction layer, strong TypeScript/C#/Java/Go/Ruby/PHP support, auth-agnostic. | Younger ecosystem; Python support is newer. |
| **Speakeasy** | Managed, high-quality idiomatic SDKs, docs, and changelogs. | Commercial cost at scale; less control over templates. |

### Recommended toolchain

- **Start with OpenAPI Generator** because it gives full control, is free/open-source, and supports all Phase 1 languages well.
- Maintain custom generator templates per language in `sdk-templates/{language}` so output stays idiomatic.
- Run a **6-month evaluation of Kiota** (and optionally Speakeasy) using the TypeScript SDK as a pilot. The decision to switch one or more languages will be data-driven.

### Validation pipeline

Every spec change triggers:
1. OpenAPI linting (`spectral`).
2. Example validation against real or recorded Plex responses.
3. Generator dry-run for all Phase 1 languages.
4. Breaking-change detection with `openapi-diff`.

---

## 5. Repository and package structure

```
plexapi-sdks/
├── spec/
│   └── plex-media-server.openapi.json   # canonical contract
├── generators/
│   ├── openapi-generator-configs/
│   └── templates/
│       ├── typescript/
│       ├── python/
│       └── go/
├── sdks/
│   ├── typescript/
│   ├── python/
│   └── go/
├── examples/
│   ├── typescript/
│   ├── python/
│   └── go/
├── .github/
│   └── workflows/
│       ├── spec-validate.yml
│       ├── sdk-generate.yml
│       └── sdk-release.yml
└── README.md
```

Each SDK is published independently under its own package name:

| Language | Package name |
|----------|--------------|
| TypeScript | `@plexapi/sdk` |
| Python | `plexapi-sdk` |
| Go | `github.com/plexapi/plexapi-go` |
| C# | `PlexApi.Sdk` |
| Java | `dev.plexapi:plexapi-sdk` |

---

## 6. Release and versioning strategy

### Independent SemVer

Each SDK follows [SemVer 2.0](https://semver.org/) independently. The SDK version is **not** tied to the Plex Media Server version.

- **Major** — breaking changes to public SDK API or dropped Plex server compatibility.
- **Minor** — new endpoints/features, backward-compatible.
- **Patch** — bug fixes, generated updates from non-breaking spec changes.

### Compatibility matrix

Publish a `COMPATIBILITY.md` per SDK and a central matrix on PlexAPI.dev:

| SDK version | Plex server min | Plex server max | Notes |
|-------------|-----------------|-----------------|-------|
| `python-plexapi-sdk 1.0.0` | `1.31.0` | `1.40.x` | Initial release |
| `python-plexapi-sdk 1.1.0` | `1.31.0` | `1.41.x` | Added playlist endpoints |

### Spec version

The OpenAPI spec itself uses `major.minor` versioning:
- **Spec major** increments on breaking endpoint/contract changes.
- **Spec minor** increments on additive changes.

SDK generator config pins the spec revision used to build a release.

### Release cadence

- **On spec minor change** — regenerate and release patch/minor SDKs automatically.
- **On spec major change** — manual review; release new SDK major with migration guide.
- **Quarterly** — review Phase 2 language candidates and template quality.

---

## 7. Security and authentication

1. **Token handling** — SDKs accept Plex tokens via environment variables, configuration files, or runtime arguments; never embed tokens in generated code or examples.
2. **HTTPS by default** — require explicit opt-in for HTTP (local servers).
3. **No credential logging** — redact `X-Plex-Token` and `Plex-Token` from debug logs.
4. **Pinned base URLs** — default to `https://plex.tv` for account endpoints and `https://<server>` for local server endpoints.

---

## 8. Developer experience (DX) standards

Every Phase 1 SDK must provide:

1. **Installation** via native package manager.
2. **Quickstart example** covering discovery of a local server and listing libraries.
3. **Typed models** for request/response payloads.
4. **Resource-oriented API** where practical.
5. **Consistent error hierarchy** (`PlexApiError`, `PlexApiAuthError`, `PlexApiTimeoutError`, etc.).
6. **Retry configuration** with sensible defaults for local-media-server workloads.
7. **Changelog** generated from conventional commits and spec changes.
8. **API reference docs** generated from OpenAPI + hand-written guides.

---

## 9. Community and contribution model

1. Open-source all SDKs under the MIT license.
2. Use GitHub Issues for bug reports and feature requests; use GitHub Discussions for language proposals.
3. Require CLA or DCO for external contributions.
4. Publish a `CONTRIBUTING.md` per language covering generator templates, local development, and testing.
5. Add a Code of Conduct and Security Policy.

---

## 10. Implementation roadmap

| Milestone | Deliverable | Owner | Estimated effort |
|-----------|-------------|-------|------------------|
| M1 | Publish canonical OpenAPI 3.1 spec covering top 50 endpoints. | Coder / API Docs | 2–3 weeks |
| M2 | OpenAPI Generator config + custom templates for TypeScript. | Coder | 1–2 weeks |
| M3 | Hand-written ergonomic layer for TypeScript SDK + examples. | Coder | 2 weeks |
| M4 | Python SDK (generated + hand-written layer). | Coder | 2 weeks |
| M5 | Go SDK (generated + hand-written layer). | Coder | 2 weeks |
| M6 | CI/CD pipelines for spec validation, generation, and release. | Coder / DevOps | 2 weeks |
| M7 | Public docs site integration, compatibility matrix, and announcement. | CTO / Docs | 1 week |
| M8 | Evaluate Kiota/Speakeasy pilot and decide on Phase 2 languages. | CTO | Ongoing |

---

## 11. Risks and mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Plex changes undocumented endpoints without notice. | High | Build a community-driven spec diff/validation pipeline; maintain deprecation windows. |
| Generated code is unidiomatic. | Medium | Invest in custom templates and a thick hand-written layer. |
| Maintenance burden across languages. | Medium | Start with 3 languages; gate expansion on community demand and maintainer bandwidth. |
| Commercial generator lock-in. | Low | Start with open-source OpenAPI Generator; keep spec canonical and portable. |

---

## 12. Next steps

1. Create child issues for M1–M6 and assign owners.
2. Set up the `plexapi-sdks` repository with the structure defined in §5.
3. Seed the canonical OpenAPI spec from existing PlexAPI.dev documentation.
4. Build the first TypeScript SDK end-to-end as a proof of concept.

