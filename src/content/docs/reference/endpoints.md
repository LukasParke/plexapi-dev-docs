---
title: API Endpoints
---

# API Endpoints

This page is generated from [`spec/plex-media-server.openapi.json`](https://github.com/plexapi-dev/docs/blob/main/spec/plex-media-server.openapi.json).
Do not edit it by hand; run `pnpm run spec:generate-reference` to regenerate it.

## Overview

| Method | Path | Summary | Operation ID |
| ------ | ---- | ------- | ------------ |
| GET | `/` | Get server information | `getServerInfo` |
| GET | `/hubs/search` | Global search across hubs | `searchHubs` |
| GET | `/identity` | Get server identity | `getIdentity` |
| GET | `/library/metadata/{ratingKey}` | Get metadata for an item | `getMetadata` |
| GET | `/library/metadata/{ratingKey}/children` | Get children of an item | `getMetadataChildren` |
| GET | `/library/sections` | List library sections | `getLibrarySections` |
| GET | `/library/sections/{sectionKey}/all` | List items in a library section | `getLibraryItems` |
| POST | `/library/sections/{sectionKey}/refresh` | Refresh a library section | `refreshLibrarySection` |
| GET | `/library/sections/{sectionKey}/search` | Search within a library section | `searchLibrarySection` |
| GET | `/playlists` | List playlists | `getPlaylists` |
| GET | `/playlists/{playlistKey}/items` | Get playlist items | `getPlaylistItems` |
| GET | `/status/sessions` | List active sessions | `getSessions` |

## Authentication

Most endpoints require an `X-Plex-Token` header or `X-Plex-Token` query parameter.

## Response format

Responses default to XML. Request JSON by sending `Accept: application/json`.
