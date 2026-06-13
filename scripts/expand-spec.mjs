#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SPEC_PATH = resolve(process.cwd(), "spec/plex-media-server.openapi.json");

const spec = JSON.parse(readFileSync(SPEC_PATH, "utf-8"));

const acceptHeader = { "$ref": "#/components/parameters/AcceptHeader" };

function pathParam(name, description, type = "string") {
  return {
    name,
    in: "path",
    required: true,
    description,
    schema: { type },
  };
}

function mcRef(schemaName) {
  return {
    description: "OK",
    content: {
      "application/json": {
        schema: { "$ref": `#/components/schemas/${schemaName}` },
      },
    },
  };
}

const newPaths = {
  "/myplex/account": {
    get: {
      operationId: "getMyPlexAccount",
      summary: "Get Plex account",
      description: "Returns the Plex.tv account associated with the server.",
      tags: ["Server"],
      "x-plex-resource": "Server",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerAccount") },
    },
  },
  "/accounts": {
    get: {
      operationId: "getAccounts",
      summary: "List managed accounts",
      description: "Returns managed accounts configured on the server.",
      tags: ["Server"],
      "x-plex-resource": "Server",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerAccounts") },
    },
  },
  "/preferences": {
    get: {
      operationId: "getPreferences",
      summary: "Get server preferences",
      description: "Returns server preference settings.",
      tags: ["Server"],
      "x-plex-resource": "Server",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerPreferences") },
    },
  },
  "/system/notification": {
    post: {
      operationId: "sendSystemNotification",
      summary: "Send system notification",
      description: "Sends a system notification to connected clients.",
      tags: ["Server"],
      "x-plex-resource": "Server",
      parameters: [
        acceptHeader,
        {
          name: "text",
          in: "query",
          required: true,
          description: "Notification text.",
          schema: { type: "string" },
        },
      ],
      responses: { 200: { description: "Notification sent." } },
    },
  },
  "/statistics": {
    get: {
      operationId: "getStatistics",
      summary: "Get server statistics",
      description: "Returns server usage statistics.",
      tags: ["Server"],
      "x-plex-resource": "Server",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerStatistics") },
    },
  },
  "/status/sessions/history": {
    get: {
      operationId: "getSessionHistory",
      summary: "Get session history",
      description: "Returns historical playback sessions.",
      tags: ["Sessions"],
      "x-plex-resource": "Sessions",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerSessionHistory") },
    },
  },
  "/status/sessions/{sessionKey}": {
    delete: {
      operationId: "terminateSession",
      summary: "Terminate a session",
      description: "Stops an active playback session.",
      tags: ["Sessions"],
      "x-plex-resource": "Sessions",
      parameters: [pathParam("sessionKey", "The session key.", "string"), acceptHeader],
      responses: { 200: { description: "Session terminated." } },
    },
  },
  "/library/onDeck": {
    get: {
      operationId: "getOnDeck",
      summary: "Get global on deck",
      description: "Returns recently added, in-progress content across all libraries.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/recentlyAdded": {
    get: {
      operationId: "getRecentlyAdded",
      summary: "Get recently added",
      description: "Returns recently added items across all libraries.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/sections/{sectionKey}/collections": {
    get: {
      operationId: "getLibraryCollections",
      summary: "List library collections",
      description: "Returns collections within a library section.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/sections/{sectionKey}/newest": {
    get: {
      operationId: "getLibraryNewest",
      summary: "Get newest library items",
      description: "Returns newest items added to a library section.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/sections/{sectionKey}/unwatched": {
    get: {
      operationId: "getLibraryUnwatched",
      summary: "Get unwatched library items",
      description: "Returns unwatched items in a library section.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/sections/{sectionKey}/folder": {
    get: {
      operationId: "getLibraryFolder",
      summary: "Browse library folder",
      description: "Returns folder-based browsing results for a library section.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/sections/{sectionKey}/firstCharacter": {
    get: {
      operationId: "getLibraryFirstCharacter",
      summary: "Get first-character groups",
      description: "Returns first-character groupings for a library section.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/sections/{sectionKey}/prefs": {
    get: {
      operationId: "getLibrarySectionPreferences",
      summary: "Get library section preferences",
      description: "Returns preferences for a library section.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: mcRef("MediaContainerPreferences") },
    },
    put: {
      operationId: "setLibrarySectionPreferences",
      summary: "Set library section preferences",
      description: "Updates preferences for a library section.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: { description: "Preferences updated." } },
    },
  },
  "/library/sections/{sectionKey}/onDeck": {
    get: {
      operationId: "getSectionOnDeck",
      summary: "Get section on deck",
      description: "Returns on-deck items for a library section.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/sections/{sectionKey}/recentlyAdded": {
    get: {
      operationId: "getSectionRecentlyAdded",
      summary: "Get section recently added",
      description: "Returns recently added items for a library section.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/sections/{sectionKey}": {
    delete: {
      operationId: "deleteLibrarySection",
      summary: "Delete a library section",
      description: "Removes a library section from the server.",
      tags: ["Library"],
      "x-plex-resource": "Library",
      parameters: [pathParam("sectionKey", "The key of the library section."), acceptHeader],
      responses: { 200: { description: "Library section deleted." } },
    },
  },
  "/library/metadata/{ratingKey}/tree": {
    get: {
      operationId: "getMetadataTree",
      summary: "Get metadata tree",
      description: "Returns the full ancestor/descendant tree for a metadata item.",
      tags: ["Metadata"],
      "x-plex-resource": "Metadata",
      parameters: [pathParam("ratingKey", "The rating key of the item."), acceptHeader],
      responses: { 200: mcRef("MediaContainerMetadataChildren") },
    },
  },
  "/library/metadata/{ratingKey}/posters": {
    get: {
      operationId: "getMetadataPosters",
      summary: "Get metadata posters",
      description: "Returns available poster images for a metadata item.",
      tags: ["Metadata"],
      "x-plex-resource": "Metadata",
      parameters: [pathParam("ratingKey", "The rating key of the item."), acceptHeader],
      responses: { 200: mcRef("MediaContainerImages") },
    },
  },
  "/library/metadata/{ratingKey}/arts": {
    get: {
      operationId: "getMetadataArts",
      summary: "Get metadata arts",
      description: "Returns available background art for a metadata item.",
      tags: ["Metadata"],
      "x-plex-resource": "Metadata",
      parameters: [pathParam("ratingKey", "The rating key of the item."), acceptHeader],
      responses: { 200: mcRef("MediaContainerImages") },
    },
  },
  "/library/metadata/{ratingKey}/similar": {
    get: {
      operationId: "getMetadataSimilar",
      summary: "Get similar items",
      description: "Returns items similar to the given metadata item.",
      tags: ["Metadata"],
      "x-plex-resource": "Metadata",
      parameters: [pathParam("ratingKey", "The rating key of the item."), acceptHeader],
      responses: { 200: mcRef("MediaContainerLibraryItems") },
    },
  },
  "/library/metadata/{ratingKey}/banner": {
    get: {
      operationId: "getMetadataBanner",
      summary: "Get metadata banner",
      description: "Returns the banner image for a metadata item.",
      tags: ["Metadata"],
      "x-plex-resource": "Metadata",
      parameters: [pathParam("ratingKey", "The rating key of the item."), acceptHeader],
      responses: { 200: { description: "Banner image." } },
    },
  },
  "/library/metadata/{ratingKey}": {
    put: {
      operationId: "updateMetadata",
      summary: "Update metadata",
      description: "Updates metadata fields for an item.",
      tags: ["Metadata"],
      "x-plex-resource": "Metadata",
      parameters: [pathParam("ratingKey", "The rating key of the item."), acceptHeader],
      responses: { 200: mcRef("MediaContainerMetadata") },
    },
    delete: {
      operationId: "deleteMetadata",
      summary: "Delete metadata item",
      description: "Removes a metadata item from the library.",
      tags: ["Metadata"],
      "x-plex-resource": "Metadata",
      parameters: [pathParam("ratingKey", "The rating key of the item."), acceptHeader],
      responses: { 200: { description: "Metadata item deleted." } },
    },
  },
  "/library/parts/{partKey}": {
    get: {
      operationId: "getLibraryPart",
      summary: "Get media part details",
      description: "Returns details for a specific media part.",
      tags: ["Metadata"],
      "x-plex-resource": "Metadata",
      parameters: [pathParam("partKey", "The key of the media part."), acceptHeader],
      responses: { 200: mcRef("MediaContainerParts") },
    },
  },
  "/playlists": {
    post: {
      operationId: "createPlaylist",
      summary: "Create playlist",
      description: "Creates a new playlist.",
      tags: ["Playlists"],
      "x-plex-resource": "Playlists",
      parameters: [
        acceptHeader,
        {
          name: "title",
          in: "query",
          required: true,
          description: "Playlist title.",
          schema: { type: "string" },
        },
        {
          name: "type",
          in: "query",
          required: true,
          description: "Playlist type (video, audio, photo).",
          schema: { type: "string", enum: ["video", "audio", "photo"] },
        },
      ],
      responses: { 200: mcRef("MediaContainerPlaylists") },
    },
  },
  "/playlists/{playlistKey}": {
    put: {
      operationId: "updatePlaylist",
      summary: "Update playlist",
      description: "Updates playlist metadata.",
      tags: ["Playlists"],
      "x-plex-resource": "Playlists",
      parameters: [pathParam("playlistKey", "The key of the playlist."), acceptHeader],
      responses: { 200: mcRef("MediaContainerPlaylists") },
    },
    delete: {
      operationId: "deletePlaylist",
      summary: "Delete playlist",
      description: "Deletes a playlist.",
      tags: ["Playlists"],
      "x-plex-resource": "Playlists",
      parameters: [pathParam("playlistKey", "The key of the playlist."), acceptHeader],
      responses: { 200: { description: "Playlist deleted." } },
    },
  },
  "/playlists/{playlistKey}/items": {
    post: {
      operationId: "addPlaylistItems",
      summary: "Add items to playlist",
      description: "Adds items to a playlist.",
      tags: ["Playlists"],
      "x-plex-resource": "Playlists",
      parameters: [
        pathParam("playlistKey", "The key of the playlist."),
        acceptHeader,
        {
          name: "uri",
          in: "query",
          required: true,
          description: "Item URI to add.",
          schema: { type: "string" },
        },
      ],
      responses: { 200: mcRef("MediaContainerPlaylistItems") },
    },
  },
  "/playlists/{playlistKey}/items/{itemKey}": {
    delete: {
      operationId: "removePlaylistItem",
      summary: "Remove item from playlist",
      description: "Removes an item from a playlist.",
      tags: ["Playlists"],
      "x-plex-resource": "Playlists",
      parameters: [
        pathParam("playlistKey", "The key of the playlist."),
        pathParam("itemKey", "The key of the playlist item."),
        acceptHeader,
      ],
      responses: { 200: mcRef("MediaContainerPlaylistItems") },
    },
  },
  "/hubs/sections/{sectionKey}/search": {
    get: {
      operationId: "searchSectionHubs",
      summary: "Search within a section hub",
      description: "Returns hub search results scoped to a library section.",
      tags: ["Hub"],
      "x-plex-resource": "Hub",
      parameters: [
        pathParam("sectionKey", "The key of the library section."),
        acceptHeader,
        {
          name: "query",
          in: "query",
          required: true,
          description: "Search query string.",
          schema: { type: "string" },
        },
        {
          name: "limit",
          in: "query",
          description: "Maximum results per hub.",
          schema: { type: "integer", default: 5 },
        },
      ],
      responses: { 200: mcRef("MediaContainerHub") },
    },
  },
  "/hubs/promoted": {
    get: {
      operationId: "getPromotedHubs",
      summary: "Get promoted hubs",
      description: "Returns promoted hub content.",
      tags: ["Hub"],
      "x-plex-resource": "Hub",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerHub") },
    },
  },
  "/hubs/home": {
    get: {
      operationId: "getHomeHubs",
      summary: "Get home hubs",
      description: "Returns home screen hub content.",
      tags: ["Hub"],
      "x-plex-resource": "Hub",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerHub") },
    },
  },
  "/photo/:/transcode": {
    get: {
      operationId: "transcodePhoto",
      summary: "Transcode a photo",
      description: "Returns a transcoded photo asset.",
      tags: ["Media"],
      "x-plex-resource": "Media",
      parameters: [
        acceptHeader,
        {
          name: "url",
          in: "query",
          required: true,
          description: "Photo URL to transcode.",
          schema: { type: "string" },
        },
        {
          name: "width",
          in: "query",
          description: "Target width.",
          schema: { type: "integer" },
        },
        {
          name: "height",
          in: "query",
          description: "Target height.",
          schema: { type: "integer" },
        },
      ],
      responses: { 200: { description: "Transcoded image." } },
    },
  },
  "/video/:/transcode/universal/decision": {
    get: {
      operationId: "getTranscodeDecision",
      summary: "Get transcode decision",
      description: "Returns a playback transcode decision.",
      tags: ["Media"],
      "x-plex-resource": "Media",
      parameters: [
        acceptHeader,
        {
          name: "hasMDE",
          in: "query",
          description: "Has media decision engine data.",
          schema: { type: "integer", enum: [0, 1] },
        },
        {
          name: "path",
          in: "query",
          description: "Media path.",
          schema: { type: "string" },
        },
      ],
      responses: { 200: mcRef("MediaContainerTranscodeDecision") },
    },
  },
  "/video/:/transcode/sessions/{sessionId}": {
    get: {
      operationId: "getTranscodeSession",
      summary: "Get transcode session",
      description: "Returns details for an active transcode session.",
      tags: ["Media"],
      "x-plex-resource": "Media",
      parameters: [pathParam("sessionId", "The transcode session ID."), acceptHeader],
      responses: { 200: mcRef("MediaContainerTranscodeSession") },
    },
  },
  "/:/timeline": {
    post: {
      operationId: "postTimeline",
      summary: "Post playback timeline",
      description: "Reports playback progress to the server.",
      tags: ["Media"],
      "x-plex-resource": "Media",
      parameters: [
        acceptHeader,
        {
          name: "ratingKey",
          in: "query",
          required: true,
          description: "Rating key of the item.",
          schema: { type: "string" },
        },
        {
          name: "state",
          in: "query",
          required: true,
          description: "Playback state.",
          schema: { type: "string", enum: ["playing", "paused", "stopped"] },
        },
        {
          name: "time",
          in: "query",
          required: true,
          description: "Current playback position in milliseconds.",
          schema: { type: "integer" },
        },
      ],
      responses: { 200: { description: "Timeline recorded." } },
    },
  },
  "/:/scrobble": {
    post: {
      operationId: "scrobble",
      summary: "Scrobble item",
      description: "Marks an item as watched.",
      tags: ["Media"],
      "x-plex-resource": "Media",
      parameters: [
        acceptHeader,
        {
          name: "ratingKey",
          in: "query",
          required: true,
          description: "Rating key of the item.",
          schema: { type: "string" },
        },
      ],
      responses: { 200: { description: "Item scrobbled." } },
    },
  },
  "/:/unscrobble": {
    post: {
      operationId: "unscrobble",
      summary: "Unscrobble item",
      description: "Marks an item as unwatched.",
      tags: ["Media"],
      "x-plex-resource": "Media",
      parameters: [
        acceptHeader,
        {
          name: "ratingKey",
          in: "query",
          required: true,
          description: "Rating key of the item.",
          schema: { type: "string" },
        },
      ],
      responses: { 200: { description: "Item unscrobbled." } },
    },
  },
  "/:/progress": {
    post: {
      operationId: "postProgress",
      summary: "Post viewing progress",
      description: "Updates viewing progress for an item.",
      tags: ["Media"],
      "x-plex-resource": "Media",
      parameters: [
        acceptHeader,
        {
          name: "ratingKey",
          in: "query",
          required: true,
          description: "Rating key of the item.",
          schema: { type: "string" },
        },
        {
          name: "time",
          in: "query",
          required: true,
          description: "Progress position in milliseconds.",
          schema: { type: "integer" },
        },
      ],
      responses: { 200: { description: "Progress recorded." } },
    },
  },
  "/sync/items": {
    get: {
      operationId: "getSyncItems",
      summary: "List sync items",
      description: "Returns configured sync items.",
      tags: ["Sync"],
      "x-plex-resource": "Sync",
      parameters: [acceptHeader],
      responses: { 200: mcRef("MediaContainerSyncItems") },
    },
  },
  "/sync/refresh": {
    post: {
      operationId: "refreshSync",
      summary: "Refresh sync",
      description: "Triggers a refresh of sync items.",
      tags: ["Sync"],
      "x-plex-resource": "Sync",
      parameters: [acceptHeader],
      responses: { 200: { description: "Sync refresh triggered." } },
    },
  },
};

const newSchemas = {
  MediaContainerAccount: {
    type: "object",
    description: "Root wrapper for Plex account response.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/PlexAccount" },
    },
  },
  PlexAccount: {
    type: "object",
    description: "Plex.tv account details.",
    properties: {
      size: { type: "integer" },
      email: { type: "string" },
      username: { type: "string" },
      thumb: { type: "string" },
      home: { type: "boolean" },
      guest: { type: "boolean" },
      queueEmail: { type: "string" },
    },
  },
  MediaContainerAccounts: {
    type: "object",
    description: "Root wrapper for managed accounts response.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/Accounts" },
    },
  },
  Accounts: {
    type: "object",
    description: "Collection of managed accounts.",
    properties: {
      size: { type: "integer" },
      Account: {
        type: "array",
        items: { "$ref": "#/components/schemas/Account" },
      },
    },
  },
  Account: {
    type: "object",
    description: "A managed account.",
    properties: {
      id: { type: "integer" },
      key: { type: "string" },
      name: { type: "string" },
      defaultAudioLanguage: { type: "string" },
      defaultSubtitleLanguage: { type: "string" },
    },
  },
  MediaContainerPreferences: {
    type: "object",
    description: "Root wrapper for preferences response.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/Preferences" },
    },
  },
  Preferences: {
    type: "object",
    description: "Collection of server or section preferences.",
    properties: {
      size: { type: "integer" },
      Setting: {
        type: "array",
        items: { "$ref": "#/components/schemas/Setting" },
      },
    },
  },
  Setting: {
    type: "object",
    description: "A single preference setting.",
    properties: {
      id: { type: "string" },
      label: { type: "string" },
      summary: { type: "string" },
      type: { type: "string" },
      default: {},
      value: {},
      hidden: { type: "boolean" },
      advanced: { type: "boolean" },
    },
  },
  MediaContainerStatistics: {
    type: "object",
    description: "Root wrapper for server statistics.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/Statistics" },
    },
  },
  Statistics: {
    type: "object",
    description: "Server statistics container.",
    properties: {
      size: { type: "integer" },
      Account: {
        type: "array",
        items: { "$ref": "#/components/schemas/StatisticsAccount" },
      },
    },
  },
  StatisticsAccount: {
    type: "object",
    description: "Per-account playback statistics.",
    properties: {
      accountID: { type: "integer" },
      Device: {
        type: "array",
        items: { "$ref": "#/components/schemas/StatisticsDevice" },
      },
    },
  },
  StatisticsDevice: {
    type: "object",
    description: "Per-device playback statistics.",
    properties: {
      deviceName: { type: "string" },
      lastPlayedAt: { type: "integer" },
      totalPlays: { type: "integer" },
    },
  },
  MediaContainerSessionHistory: {
    type: "object",
    description: "Root wrapper for session history.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/SessionHistory" },
    },
  },
  SessionHistory: {
    type: "object",
    description: "Collection of historical playback sessions.",
    properties: {
      size: { type: "integer" },
      totalSize: { type: "integer" },
      offset: { type: "integer" },
      Metadata: {
        type: "array",
        items: { "$ref": "#/components/schemas/SessionHistoryEntry" },
      },
    },
  },
  SessionHistoryEntry: {
    type: "object",
    description: "A single historical playback session.",
    properties: {
      ratingKey: { type: "string" },
      key: { type: "string" },
      parentRatingKey: { type: "string" },
      grandparentRatingKey: { type: "string" },
      title: { type: "string" },
      type: { type: "string" },
      thumb: { type: "string" },
      viewedAt: { type: "integer" },
      accountID: { type: "integer" },
      deviceID: { type: "integer" },
    },
  },
  MediaContainerImages: {
    type: "object",
    description: "Root wrapper for available images.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/Images" },
    },
  },
  Images: {
    type: "object",
    description: "Collection of available images.",
    properties: {
      size: { type: "integer" },
      Photo: {
        type: "array",
        items: { "$ref": "#/components/schemas/Image" },
      },
    },
  },
  Image: {
    type: "object",
    description: "An image asset.",
    properties: {
      key: { type: "string" },
      ratingKey: { type: "string" },
      selected: { type: "boolean" },
      thumb: { type: "string" },
    },
  },
  MediaContainerParts: {
    type: "object",
    description: "Root wrapper for media parts.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/Parts" },
    },
  },
  Parts: {
    type: "object",
    description: "Collection of media parts.",
    properties: {
      size: { type: "integer" },
      Metadata: {
        type: "array",
        items: { "$ref": "#/components/schemas/Part" },
      },
    },
  },
  MediaContainerTranscodeDecision: {
    type: "object",
    description: "Root wrapper for a transcode decision.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/TranscodeDecision" },
    },
  },
  TranscodeDecision: {
    type: "object",
    description: "Playback transcode decision.",
    properties: {
      size: { type: "integer" },
      canDirectPlay: { type: "boolean" },
      canDirectStream: { type: "boolean" },
      canTranscode: { type: "boolean" },
      transcodeContainer: { type: "string" },
      transcodeVideoCodec: { type: "string" },
      transcodeAudioCodec: { type: "string" },
      transcodeProtocol: { type: "string" },
    },
  },
  MediaContainerTranscodeSession: {
    type: "object",
    description: "Root wrapper for transcode session details.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/TranscodeSession" },
    },
  },
  TranscodeSession: {
    type: "object",
    description: "Details of an active transcode session.",
    properties: {
      key: { type: "string" },
      throttled: { type: "boolean" },
      complete: { type: "boolean" },
      progress: { type: "number" },
      size: { type: "integer" },
      speed: { type: "number" },
      error: { type: "boolean" },
      duration: { type: "integer" },
      context: { type: "string" },
      sourceVideoCodec: { type: "string" },
      sourceAudioCodec: { type: "string" },
      videoDecision: { type: "string" },
      audioDecision: { type: "string" },
      protocol: { type: "string" },
      container: { type: "string" },
    },
  },
  MediaContainerSyncItems: {
    type: "object",
    description: "Root wrapper for sync items.",
    properties: {
      MediaContainer: { "$ref": "#/components/schemas/SyncItems" },
    },
  },
  SyncItems: {
    type: "object",
    description: "Collection of sync items.",
    properties: {
      size: { type: "integer" },
      SyncItem: {
        type: "array",
        items: { "$ref": "#/components/schemas/SyncItem" },
      },
    },
  },
  SyncItem: {
    type: "object",
    description: "A sync item.",
    properties: {
      id: { type: "integer" },
      version: { type: "integer" },
      rootTitle: { type: "string" },
      title: { type: "string" },
      status: { type: "string" },
      downloadState: { type: "array", items: { type: "string" } },
    },
  },
};

// Add tags if missing
const tagNames = new Set(spec.tags.map((t) => t.name));
const requiredTags = ["Media", "Sync"];
for (const name of requiredTags) {
  if (!tagNames.has(name)) {
    spec.tags.push({ name, description: `${name} endpoints.` });
  }
}

// Merge paths (preserve existing methods) and schemas
for (const [path, methods] of Object.entries(newPaths)) {
  if (!spec.paths[path]) {
    spec.paths[path] = methods;
  } else {
    for (const [method, operation] of Object.entries(methods)) {
      spec.paths[path][method] = operation;
    }
  }
}
Object.assign(spec.components.schemas, newSchemas);

// Bump spec minor version
const [major, minor] = spec.info.version.split(".").map(Number);
spec.info.version = `${major}.${minor + 1}.0`;

writeFileSync(SPEC_PATH, JSON.stringify(spec, null, 2) + "\n", "utf-8");

const pathCount = Object.keys(spec.paths).length;
const schemaCount = Object.keys(spec.components.schemas).length;
console.log(`✅ Expanded spec to ${pathCount} paths and ${schemaCount} schemas.`);
console.log(`   Version bumped to ${spec.info.version}`);
