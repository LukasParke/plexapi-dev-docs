---
title: Quick Start
description: Make your first authenticated request to a Plex Media Server.
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

# Quick Start

This guide walks you through your first authenticated request to a Plex Media Server in under five minutes. It includes copy-pasteable examples for `curl`, Node.js, and Python.

## Before you begin

You will need:

1. The address of your Plex server, for example `http://192.168.1.10:32400` or `https://plex.example.com`.
2. A valid Plex token. See the [Authentication](/guides/authentication/) guide if you do not have one yet.
3. `curl`, Node.js, or Python installed.

## Set environment variables

To keep the examples copy-pasteable, store your server URL and token in environment variables:

\u003cTabs\u003e
\u003cTabItem label="macOS / Linux"\u003e

```bash
export PLEX_SERVER_URL="http://\u003cyour-server-ip\u003e:32400"
export PLEX_TOKEN="\u003cyour-token\u003e"
```

\u003c/TabItem\u003e
\u003cTabItem label="Windows PowerShell"\u003e

```powershell
$env:PLEX_SERVER_URL="http://\u003cyour-server-ip\u003e:32400"
$env:PLEX_TOKEN="\u003cyour-token\u003e"
```

\u003c/TabItem\u003e
\u003c/Tabs\u003e

:::caution
Never commit tokens to source control. Use environment variables or a secrets manager in production.
:::

## Verify the server is reachable

Plex Media Server exposes server identity and capabilities at the root path. This endpoint does not require a token on most local networks:

\u003cTabs\u003e
\u003cTabItem label="curl"\u003e

```bash
curl "$PLEX_SERVER_URL/"
```

\u003c/TabItem\u003e
\u003cTabItem label="Node.js"\u003e

```js
const res = await fetch(`${process.env.PLEX_SERVER_URL}/`);
console.log(await res.text());
```

\u003c/TabItem\u003e
\u003cTabItem label="Python"\u003e

```py
import os, urllib.request

url = f"{os.environ['PLEX_SERVER_URL']}/"
with urllib.request.urlopen(url) as res:
    print(res.read().decode())
```

\u003c/TabItem\u003e
\u003c/Tabs\u003e

You should receive an XML `MediaContainer` response with the server name, version, and other metadata. If the request fails, confirm the server address and that the server is running.

## List your libraries

List the libraries on your server:

\u003cTabs\u003e
\u003cTabItem label="curl"\u003e

```bash
curl -H "X-Plex-Token: $PLEX_TOKEN" \
  -H "Accept: application/json" \
  "$PLEX_SERVER_URL/library/sections"
```

\u003c/TabItem\u003e
\u003cTabItem label="Node.js"\u003e

```js
const res = await fetch(`${process.env.PLEX_SERVER_URL}/library/sections`, {
  headers: {
    "X-Plex-Token": process.env.PLEX_TOKEN,
    "Accept": "application/json",
  },
});
console.log(await res.json());
```

\u003c/TabItem\u003e
\u003cTabItem label="Python"\u003e

```py
import os, urllib.request

url = f"{os.environ['PLEX_SERVER_URL']}/library/sections"
req = urllib.request.Request(
    url,
    headers={
        "X-Plex-Token": os.environ["PLEX_TOKEN"],
        "Accept": "application/json",
    },
)
with urllib.request.urlopen(req) as res:
    print(res.read().decode())
```

\u003c/TabItem\u003e
\u003c/Tabs\u003e

You should receive a response containing one or more `Directory` entries representing your libraries.

## Request JSON responses

Plex returns XML by default. Add an `Accept` header to get JSON:

```bash
curl -H "X-Plex-Token: $PLEX_TOKEN" \
  -H "Accept: application/json" \
  "$PLEX_SERVER_URL/library/sections"
```

Many integrations prefer JSON, but some response fields and nested arrays are easier to read in XML. Use whichever format your tooling handles best.

## List items in a library

Use the library key from the previous response to list its contents. Replace `\u003clibrary-key\u003e` with the value of the `key` field, for example `1`:

\u003cTabs\u003e
\u003cTabItem label="curl"\u003e

```bash
curl -H "X-Plex-Token: $PLEX_TOKEN" \
  -H "Accept: application/json" \
  "$PLEX_SERVER_URL/library/sections/\u003clibrary-key\u003e/all"
```

\u003c/TabItem\u003e
\u003cTabItem label="Node.js"\u003e

```js
const libraryKey = "\u003clibrary-key\u003e";
const res = await fetch(
  `${process.env.PLEX_SERVER_URL}/library/sections/${libraryKey}/all`,
  {
    headers: {
      "X-Plex-Token": process.env.PLEX_TOKEN,
      "Accept": "application/json",
    },
  }
);
console.log(await res.json());
```

\u003c/TabItem\u003e
\u003cTabItem label="Python"\u003e

```py
import os, urllib.request

library_key = "\u003clibrary-key\u003e"
url = f"{os.environ['PLEX_SERVER_URL']}/library/sections/{library_key}/all"
req = urllib.request.Request(
    url,
    headers={
        "X-Plex-Token": os.environ["PLEX_TOKEN"],
        "Accept": "application/json",
    },
)
with urllib.request.urlopen(req) as res:
    print(res.read().decode())
```

\u003c/TabItem\u003e
\u003c/Tabs\u003e

## Check active sessions

See what is currently playing on the server:

\u003cTabs\u003e
\u003cTabItem label="curl"\u003e

```bash
curl -H "X-Plex-Token: $PLEX_TOKEN" \
  -H "Accept: application/json" \
  "$PLEX_SERVER_URL/status/sessions"
```

\u003c/TabItem\u003e
\u003cTabItem label="Node.js"\u003e

```js
const res = await fetch(`${process.env.PLEX_SERVER_URL}/status/sessions`, {
  headers: {
    "X-Plex-Token": process.env.PLEX_TOKEN,
    "Accept": "application/json",
  },
});
console.log(await res.json());
```

\u003c/TabItem\u003e
\u003cTabItem label="Python"\u003e

```py
import os, urllib.request

url = f"{os.environ['PLEX_SERVER_URL']}/status/sessions"
req = urllib.request.Request(
    url,
    headers={
        "X-Plex-Token": os.environ["PLEX_TOKEN"],
        "Accept": "application/json",
    },
)
with urllib.request.urlopen(req) as res:
    print(res.read().decode())
```

\u003c/TabItem\u003e
\u003c/Tabs\u003e

## Identify your client

When you move beyond experiments, add `X-Plex-*` headers so the server knows which client is calling. See the [Authentication](/guides/authentication/) guide for the full list.

## Next steps

- Read the [Authentication](/guides/authentication/) guide for token management best practices and how to obtain a token.
- Explore the [API Reference](/reference/) for available endpoints and parameters.
- Learn how to request `Accept: application/json` and interpret Plex XML responses.
