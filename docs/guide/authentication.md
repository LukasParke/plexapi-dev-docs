# Authentication

Plex Media Server uses token-based authentication. Nearly every endpoint requires a valid token sent as a header or query parameter.

## Token types

| Token type | Use case | How to obtain |
|------------|----------|---------------|
| Server token | Talk to your own server | Settings > Network > Show Advanced > Token, or the `X-Plex-Token` query parameter while signed into the web app |
| Plex.tv token | Identify a user or access shared servers | [Plex.tv authentication APIs](https://support.plex.tv/articles/204059436-finding-an-authentication-token-x-plex-token/) |

## Sending the token

### Header (recommended)

```bash
curl -H "X-Plex-Token: your-token" \
  -H "Accept: application/json" \
  "http://localhost:32400/library/sections"
```

### Query parameter

```bash
curl -H "Accept: application/json" \
  "http://localhost:32400/library/sections?X-Plex-Token=your-token"
```

Prefer the header to keep tokens out of server logs and browser history.

## Required headers

Some endpoints expect additional `X-Plex-*` headers for identification and compatibility:

| Header | Purpose | Example |
|--------|---------|---------|
| `X-Plex-Token` | Authentication | `your-token` |
| `X-Plex-Client-Identifier` | Unique client ID | `my-dashboard-1234` |
| `X-Plex-Product` | Product name | `My Plex Dashboard` |
| `X-Plex-Version` | Product version | `1.0.0` |

## Security guidelines

- Treat tokens like passwords. Do not commit them to source control or paste them into public examples.
- Load tokens from environment variables or a secrets manager.
- Use HTTPS when exposing a server to the internet.
