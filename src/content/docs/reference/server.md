---
title: Server
description: Server discovery, identity, and top-level status.
---

# Server

Server discovery, identity, and top-level status.

## Get server identity

```http
GET /identity
```

Returns the server's identity, including its unique machine identifier. This endpoint does **not** require authentication and is useful for server discovery.

### Response

```json
{
  "MediaContainer": {
    "size": 0,
    "claimed": true,
    "machineIdentifier": "abc123def456",
    "version": "1.40.2.8395"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `machineIdentifier` | `string` | Unique identifier for this Plex server. |
| `claimed` | `boolean` | Whether the server is claimed to a Plex account. |
| `version` | `string` | Plex Media Server version. |

## Get server information

```http
GET /
```

Returns server capabilities, features, and configuration.

### Response

```json
{
  "MediaContainer": {
    "size": 14,
    "friendlyName": "My Plex Server",
    "machineIdentifier": "abc123def456",
    "platform": "Linux",
    "platformVersion": "5.15.0",
    "version": "1.40.2.8395",
    "myPlex": true,
    "myPlexUsername": "user@example.com",
    "Directory": [
      { "key": "activities", "title": "activities" },
      { "key": "butler", "title": "butler" }
    ]
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `friendlyName` | `string` | Human-readable server name. |
| `platform` | `string` | Operating system family. |
| `version` | `string` | Server version. |
| `myPlex` | `boolean` | Whether the server is signed in to Plex.tv. |
| `Directory` | `array` | Server capability directories. |
