---
title: Hubs
---

# Hubs

Global and per-library search hubs.

## Global search across hubs

```http
GET /hubs/search
```

Returns search results grouped by hub across all libraries.

### Query parameters

| Name | Type | Description |
|------|------|-------------|
| `query` | `string` | **Required.** Search query string. |
| `limit` | `integer` | Maximum results per hub. Default: `5`. |

### Response

```json
{
  "MediaContainer": {
    "size": 2,
    "Hub": [
      {
        "title": "Movies",
        "type": "movie",
        "HubEntry": [
          {
            "ratingKey": "100",
            "title": "The Shawshank Redemption",
            "type": "movie"
          }
        ]
      }
    ]
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `Hub.title` | `string` | Hub display name. |
| `Hub.type` | `string` | Hub media type. |
| `HubEntry.ratingKey` | `string` | Item identifier. |
| `HubEntry.title` | `string` | Item title. |
