# TypeScript Fetch Templates

This directory holds custom [OpenAPI Generator](https://openapi-generator.tech/) Mustache templates for the `typescript-fetch` generator.

To generate the core client with custom templates, update `package.json`:

```json
"generate:core": "openapi-generator-cli generate -i ../../spec/plex-media-server.openapi.json -g typescript-fetch -c openapi-generator-config.json -o generated/core -t templates/typescript-fetch"
```

For the proof of concept, the default generator templates are used. Custom templates will be added as the SDK matures to improve idiomatic output (e.g. branded types for rating keys, normalized error handling).
