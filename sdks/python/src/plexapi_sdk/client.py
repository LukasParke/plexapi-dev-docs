"""Low-level HTTP client for the Plex Media Server API."""

from __future__ import annotations

import os
from typing import Any

import httpx


class PlexApiError(Exception):
    """Base error for Plex SDK errors."""


class PlexApiAuthError(PlexApiError):
    """Authentication or authorization failure."""


class PlexApiClient:
    """Minimal low-level client for the Plex Media Server API."""

    def __init__(
        self,
        base_url: str,
        token: str | None = None,
        timeout: float = 30.0,
        client: httpx.Client | None = None,
    ) -> None:
        self.base_url = base_url.rstrip("/")
        self.token = token or os.environ.get("PLEX_TOKEN", "")
        self.timeout = timeout
        self._client = client or httpx.Client(timeout=timeout)

    def get(self, path: str, **kwargs: Any) -> Any:
        """Send a GET request and return the parsed JSON response."""
        return self.request("GET", path, **kwargs)

    def post(self, path: str, **kwargs: Any) -> Any:
        """Send a POST request and return the parsed JSON response."""
        return self.request("POST", path, **kwargs)

    def request(self, method: str, path: str, **kwargs: Any) -> Any:
        """Send a request with Plex authentication headers."""
        url = f"{self.base_url}{path}"
        headers = kwargs.pop("headers", {})
        headers["Accept"] = "application/json"
        if self.token:
            headers["X-Plex-Token"] = self.token
        response = self._client.request(method, url, headers=headers, **kwargs)
        if response.status_code in (401, 403):
            raise PlexApiAuthError(f"Plex API returned {response.status_code}")
        response.raise_for_status()
        if response.status_code == 204 or not response.content:
            return None
        return response.json()
