---
title: Library
description: Library sections and the items they contain.
---

# Library

Library sections and the items they contain.

## List library sections

```http
GET /library/sections
```

Returns all configured library sections, such as movies, TV shows, music, and photos.

### Response

```json
{
  "MediaContainer": {
    "size": 2,
    "title1": "Plex Library",
    "title2": "",
    "Directory": [
      {
        "key": "1",
        "type": "movie",
        "title": "Movies",
        "agent": "com.plexapp.agents.imdb",
        "scanner": "Plex Movie Scanner",
        "language": "en",
        "uuid": "section-uuid-1",
        "Location": [{ "id": 1, "path": "/media/movies" }]
      },
      {
        "key": "2",
        "type": "show",
        "title": "TV Shows",
        "agent": "com.plexapp.agents.thetvdb",
        "scanner": "Plex Series Scanner",
        "language": "en",
        "uuid": "section-uuid-2",
        "Location": [{ "id": 2, "path": "/media/tv" }]
      }
    ]
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Section identifier used in subsequent requests. |
| `type` | `string` | Section type: `movie`, `show`, `artist`, or `photo`. |
| `title` | `string` | Display name. |
| `agent` | `string` | Metadata agent identifier. |
| `scanner` | `string` | Scanner used to discover files. |
| `Location` | `array` | Filesystem paths backing the section. |

## List items in a section

```http
GET /library/sections/{sectionKey}/all
```

Returns all items in the specified library section.

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `sectionKey` | `string` | Library section key from `/library/sections`. |

### Query parameters

| Name | Type | Description |
|------|------|-------------|
| `type` | `integer` | Filter by media type. Common values: `1` (movie), `2` (show), `8` (artist). |
| `includeCollections` | `integer` | `1` to include collection items. |

### Response

```json
{
  "MediaContainer": {
    "size": 2,
    "totalSize": 150,
    "offset": 0,
    "librarySectionID": 1,
    "librarySectionTitle": "Movies",
    "viewGroup": "movie",
    "Metadata": [
      {
        "ratingKey": "100",
        "key": "/library/metadata/100",
        "type": "movie",
        "title": "The Shawshank Redemption",
        "summary": "Two imprisoned men bond over a number of years...",
        "year": 1994,
        "thumb": "/library/metadata/100/thumb/1700000000",
        "duration": 8520000,
        "addedAt": 1700000000
      }
    ]
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `ratingKey` | `string` | Unique item identifier. |
| `key` | `string` | Detail endpoint for this item. |
| `type` | `string` | Item type: `movie`, `show`, `season`, `episode`, etc. |
| `title` | `string` | Item title. |
| `year` | `integer` | Release year. |
| `duration` | `integer` | Duration in milliseconds. |
| `thumb` | `string` | Thumbnail path. |
