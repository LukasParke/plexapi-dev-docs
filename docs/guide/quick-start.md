# Quick Start

Make your first authenticated request to a Plex Media Server in under five minutes.

## What you need

- The host and port of a Plex server you can reach (default is `http://localhost:32400`).
- A Plex authentication token. See [Authentication](./authentication) if you do not have one.
- `curl` or any HTTP client.

## List your libraries

```bash
export PLEX_URL="http://localhost:32400"
export PLEX_TOKEN="your-plex-token"

curl -H "X-Plex-Token: $PLEX_TOKEN" \
  -H "Accept: application/json" \
  "$PLEX_URL/library/sections"
```

A successful response returns a JSON object describing each library (movies, TV, music, etc.).

## Get server identity

```bash
curl -H "Accept: application/json" "$PLEX_URL/"
```

This endpoint does not require a token and is useful for confirming the server is online.

## Next steps

- Read the full [Authentication guide](./authentication) to understand token types and security.
- Explore the [API Reference](../reference/endpoints) for available endpoints.
