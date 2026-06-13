# plexapi-go

Go SDK for the Plex Media Server API.

## Status

Placeholder package — the generated core and hand-written resource layer will
land in upcoming iterations.

## Install

```bash
go get github.com/plexapi/plexapi-go
```

## Quick start

```go
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/plexapi/plexapi-go"
)

func main() {
    client, err := plexapi.NewClient("http://localhost:32400", "YOUR_TOKEN")
    if err != nil {
        log.Fatal(err)
    }

    identity, err := client.Get(context.Background(), "/")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(identity)
}
```

## License

MIT
