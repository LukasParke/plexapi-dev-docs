---
title: API Reference Overview
description: Overview of the Plex Media Server API reference documentation.
---

# API Reference Overview

The Plex Media Server API is a REST-ish API that returns XML or JSON depending on the endpoint and the `Accept` header you provide.

## Base URL

All endpoints are relative to your Plex server root:

```
http://<server-host>:32400
```

## Authentication

Most endpoints require an `X-Plex-Token` header or a `X-Plex-Token` query parameter. See the [Authentication guide](/guides/authentication/) for details.

```http
GET /library/sections HTTP/1.1
Host: 192.168.1.10:32400
X-Plex-Token: <your-token>
```

## Response format

Responses default to XML. Request JSON by sending:

```http
Accept: application/json
```

## Common endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /identity` | Server identity (unauthenticated) |
| `GET /` | Server information and capabilities |
| `GET /library/sections` | List media libraries |
| `GET /library/sections/{id}/all` | List all items in a library |
| `GET /library/sections/{id}/search` | Search within a library |
| `POST /library/sections/{id}/refresh` | Refresh library metadata |
| `GET /library/metadata/{id}` | Item metadata |
| `GET /library/metadata/{id}/children` | Child items (seasons, episodes, etc.) |
| `GET /playlists` | List playlists |
| `GET /playlists/{id}/items` | Playlist items |
| `GET /hubs/search` | Global search across hubs |
| `GET /status/sessions` | Active playback sessions |

## Machine-readable contract

The project maintains an OpenAPI 3.1 description of core endpoints in [`spec/plex-media-server.openapi.json`](https://github.com/LukasParke/plexapi-dev-docs/blob/main/spec/plex-media-server.openapi.json). It is the source of truth for generated reference pages and SDKs.

## Status

This reference section is actively being expanded. The [Endpoints](./endpoints/) page lists the currently documented operations; request/response schemas are modeled in the OpenAPI contract and will gain field-level documentation as the contract matures.
