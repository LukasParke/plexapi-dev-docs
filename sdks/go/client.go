// Package plexapi provides a low-level Go client for the Plex Media Server API.
package plexapi

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

// Client is a minimal low-level HTTP client for the Plex Media Server API.
type Client struct {
	BaseURL    string
	Token      string
	HTTPClient *http.Client
}

// NewClient creates a new Client with the given base URL and token.
func NewClient(baseURL, token string) (*Client, error) {
	if token == "" {
		token = os.Getenv("PLEX_TOKEN")
	}
	return &Client{
		BaseURL:    strings.TrimRight(baseURL, "/"),
		Token:      token,
		HTTPClient: &http.Client{Timeout: 30 * time.Second},
	}, nil
}

// Get sends a GET request and decodes the JSON response into result.
func (c *Client) Get(ctx context.Context, path string, result any) error {
	return c.do(ctx, http.MethodGet, path, nil, result)
}

// Post sends a POST request and decodes the JSON response into result.
func (c *Client) Post(ctx context.Context, path string, body io.Reader, result any) error {
	return c.do(ctx, http.MethodPost, path, body, result)
}

func (c *Client) do(ctx context.Context, method, path string, body io.Reader, result any) error {
	url := c.BaseURL + path
	req, err := http.NewRequestWithContext(ctx, method, url, body)
	if err != nil {
		return err
	}
	req.Header.Set("Accept", "application/json")
	if c.Token != "" {
		req.Header.Set("X-Plex-Token", c.Token)
	}

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusUnauthorized || resp.StatusCode == http.StatusForbidden {
		return fmt.Errorf("plex api auth error: %s", resp.Status)
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("plex api error: %s", resp.Status)
	}

	if resp.StatusCode == http.StatusNoContent || resp.ContentLength == 0 {
		return nil
	}

	return json.NewDecoder(resp.Body).Decode(result)
}
