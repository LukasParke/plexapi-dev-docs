---
title: Sessions
description: Active playback sessions and transcoding status.
---

# Sessions

Active playback sessions and transcoding status.

## List active sessions

```http
GET /status/sessions
```

Returns all currently active playback sessions.

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
        "Session": {
          "id": "session-id-1",
          "bandwidth": 10000,
          "location": "lan"
        },
        "Player": {
          "title": "Chrome",
          "platform": "Chrome",
          "state": "playing",
          "local": true,
          "relayed": false
        },
        "User": {
          "id": "1",
          "title": "user@example.com"
        },
        "TranscodeSession": {
          "key": "/transcode/sessions/abc",
          "throttled": false,
          "complete": false,
          "progress": 5.2,
          "speed": 1.0,
          "videoDecision": "transcode",
          "audioDecision": "copy"
        }
      }
    ]
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `Session.id` | `string` | Unique session identifier. |
| `Session.bandwidth` | `integer` | Stream bandwidth in bits per second. |
| `Player.title` | `string` | Player application name. |
| `Player.state` | `string` | Playback state: `playing`, `paused`, `buffering`, `stopped`. |
| `Player.local` | `boolean` | Whether the player is on the local network. |
| `User.id` | `string` | User identifier. |
| `User.title` | `string` | User display name or email. |
| `TranscodeSession.progress` | `number` | Transcoding progress percentage. |
| `TranscodeSession.speed` | `number` | Transcoding speed multiplier. |
| `TranscodeSession.videoDecision` | `string` | `transcode`, `copy`, or `direct`. |
| `TranscodeSession.audioDecision` | `string` | `transcode`, `copy`, or `direct`. |
