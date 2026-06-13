# plexapi-sdk

Python SDK for the Plex Media Server API.

## Status

Placeholder package — the generated core and hand-written resource layer will
land in upcoming iterations.

## Install

```bash
pip install plexapi-sdk
```

## Quick start

```python
from plexapi_sdk import PlexApiClient

client = PlexApiClient(base_url="http://localhost:32400", token="YOUR_TOKEN")
identity = client.get("/")
print(identity)
```

## Development

```bash
cd sdks/python
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
pytest
```

## License

MIT
