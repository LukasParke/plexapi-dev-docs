---
title: Playlists
---

# Playlists

Playlists and playlist items.

## List playlists

```http
GET /playlists
```

Returns all playlists for the authenticated user.

### Response

```json
{
  "MediaContainer": {
    "size": 1,
    "Metadata": [
      {
        "ratingKey": "200",
        "key": "/playlists/200",
        "type": "playlist",
        "title": "Weekend Watchlist",
        "summary": "Favorite movies for the weekend.",
        "smart": false,
        "playlistType": "video",
        "leafCount": 12
      }
    ]
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `ratingKey` | `string` | Playlist identifier. |
| `title` | `string` | Playlist name. |
| `smart` | `boolean` | Whether the playlist is a smart playlist. |
| `playlistType` | `string` | Item type in the playlist, e.g. `video`, `audio`. |
| `leafCount` | `integer` | Number of items in the playlist. |

## Get playlist items

```http
GET /playlists/{playlistKey}/items
```

Returns the items contained in a playlist.

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `playlistKey` | `string` | The key of the playlist. |
