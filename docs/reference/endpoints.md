---
title: API Endpoints
---

# API Endpoints

This page is generated from [`spec/plex-media-server.openapi.json`](https://github.com/LukasParke/plexapi-dev-docs/blob/main/spec/plex-media-server.openapi.json).
Do not edit it by hand; run `pnpm run spec:generate-reference` to regenerate it.

## Overview

| Method | Path | Summary | Operation ID |
| ------ | ---- | ------- | ------------ |
| GET | `/` | Get server information | `getServerInfo` |
| POST | `/:/progress` | Post viewing progress | `postProgress` |
| POST | `/:/scrobble` | Scrobble item | `scrobble` |
| POST | `/:/timeline` | Post playback timeline | `postTimeline` |
| POST | `/:/unscrobble` | Unscrobble item | `unscrobble` |
| GET | `/accounts` | List managed accounts | `getAccounts` |
| GET | `/hubs/home` | Get home hubs | `getHomeHubs` |
| GET | `/hubs/promoted` | Get promoted hubs | `getPromotedHubs` |
| GET | `/hubs/search` | Global search across hubs | `searchHubs` |
| GET | `/hubs/sections/{sectionKey}/search` | Search within a section hub | `searchSectionHubs` |
| GET | `/identity` | Get server identity | `getIdentity` |
| GET | `/library/metadata/{ratingKey}` | Get metadata for an item | `getMetadata` |
| PUT | `/library/metadata/{ratingKey}` | Update metadata | `updateMetadata` |
| DELETE | `/library/metadata/{ratingKey}` | Delete metadata item | `deleteMetadata` |
| GET | `/library/metadata/{ratingKey}/arts` | Get metadata arts | `getMetadataArts` |
| GET | `/library/metadata/{ratingKey}/banner` | Get metadata banner | `getMetadataBanner` |
| GET | `/library/metadata/{ratingKey}/children` | Get children of an item | `getMetadataChildren` |
| GET | `/library/metadata/{ratingKey}/posters` | Get metadata posters | `getMetadataPosters` |
| GET | `/library/metadata/{ratingKey}/similar` | Get similar items | `getMetadataSimilar` |
| GET | `/library/metadata/{ratingKey}/tree` | Get metadata tree | `getMetadataTree` |
| GET | `/library/onDeck` | Get global on deck | `getOnDeck` |
| GET | `/library/parts/{partKey}` | Get media part details | `getLibraryPart` |
| GET | `/library/recentlyAdded` | Get recently added | `getRecentlyAdded` |
| GET | `/library/sections` | List library sections | `getLibrarySections` |
| DELETE | `/library/sections/{sectionKey}` | Delete a library section | `deleteLibrarySection` |
| GET | `/library/sections/{sectionKey}/all` | List items in a library section | `getLibraryItems` |
| GET | `/library/sections/{sectionKey}/collections` | List library collections | `getLibraryCollections` |
| GET | `/library/sections/{sectionKey}/firstCharacter` | Get first-character groups | `getLibraryFirstCharacter` |
| GET | `/library/sections/{sectionKey}/folder` | Browse library folder | `getLibraryFolder` |
| GET | `/library/sections/{sectionKey}/newest` | Get newest library items | `getLibraryNewest` |
| GET | `/library/sections/{sectionKey}/onDeck` | Get section on deck | `getSectionOnDeck` |
| GET | `/library/sections/{sectionKey}/prefs` | Get library section preferences | `getLibrarySectionPreferences` |
| PUT | `/library/sections/{sectionKey}/prefs` | Set library section preferences | `setLibrarySectionPreferences` |
| GET | `/library/sections/{sectionKey}/recentlyAdded` | Get section recently added | `getSectionRecentlyAdded` |
| POST | `/library/sections/{sectionKey}/refresh` | Refresh a library section | `refreshLibrarySection` |
| GET | `/library/sections/{sectionKey}/search` | Search within a library section | `searchLibrarySection` |
| GET | `/library/sections/{sectionKey}/unwatched` | Get unwatched library items | `getLibraryUnwatched` |
| GET | `/myplex/account` | Get Plex account | `getMyPlexAccount` |
| GET | `/photo/:/transcode` | Transcode a photo | `transcodePhoto` |
| GET | `/playlists` | List playlists | `getPlaylists` |
| POST | `/playlists` | Create playlist | `createPlaylist` |
| PUT | `/playlists/{playlistKey}` | Update playlist | `updatePlaylist` |
| DELETE | `/playlists/{playlistKey}` | Delete playlist | `deletePlaylist` |
| GET | `/playlists/{playlistKey}/items` | Get playlist items | `getPlaylistItems` |
| POST | `/playlists/{playlistKey}/items` | Add items to playlist | `addPlaylistItems` |
| DELETE | `/playlists/{playlistKey}/items/{itemKey}` | Remove item from playlist | `removePlaylistItem` |
| GET | `/preferences` | Get server preferences | `getPreferences` |
| GET | `/statistics` | Get server statistics | `getStatistics` |
| GET | `/status/sessions` | List active sessions | `getSessions` |
| DELETE | `/status/sessions/{sessionKey}` | Terminate a session | `terminateSession` |
| GET | `/status/sessions/history` | Get session history | `getSessionHistory` |
| GET | `/sync/items` | List sync items | `getSyncItems` |
| POST | `/sync/refresh` | Refresh sync | `refreshSync` |
| POST | `/system/notification` | Send system notification | `sendSystemNotification` |
| GET | `/video/:/transcode/sessions/{sessionId}` | Get transcode session | `getTranscodeSession` |
| GET | `/video/:/transcode/universal/decision` | Get transcode decision | `getTranscodeDecision` |

## Authentication

Most endpoints require an `X-Plex-Token` header or `X-Plex-Token` query parameter.

## Response format

Responses default to XML. Request JSON by sending `Accept: application/json`.
