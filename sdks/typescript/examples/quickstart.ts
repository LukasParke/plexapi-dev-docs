import { PlexApiClient } from "../src/index.js";

async function main() {
  const baseUrl = process.env.PLEX_BASE_URL ?? "http://localhost:32400";
  const token = process.env.PLEX_TOKEN;

  if (!token) {
    console.error("Set PLEX_TOKEN to run this example.");
    process.exit(1);
  }

  const client = new PlexApiClient({ baseUrl, token });

  const identity = await client.server.identity();
  console.log("Server:", identity.MediaContainer?.title1);

  const libraries = await client.libraries.list();
  for (const library of libraries.MediaContainer?.Directory ?? []) {
    console.log(`Library: ${library.title} (${library.type})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
