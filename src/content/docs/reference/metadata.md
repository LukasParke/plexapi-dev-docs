---
title: Metadata
---

# Metadata

Item-level metadata and relationships.

## Get metadata for an item

```http
GET /library/metadata/{ratingKey}
```

Returns full metadata for a single item by its rating key.

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `ratingKey` | `string` | The rating key of the item. |

### Response

```json
{
  "MediaContainer": {
    "size": 1,
    "Metadata": [
      {
        "ratingKey": "100",
        "key": "/library/metadata/100",
        "type": "movie",
        "title": "The Shawshank Redemption",
        "summary": "Two imprisoned men bond over a number of years...",
        "year": 1994,
        "thumb": "/library/metadata/100/thumb/1700000000"
      }
    ]
  }
}
```

## Get children of an item

```http
GET /library/metadata/{ratingKey}/children
```

Returns child items for a metadata object, such as seasons of a show or episodes of a season.

### Path parameters

| Name | Type | Description |
|------|------|-------------|
| `ratingKey` | `string` | The rating key of the parent item. |
