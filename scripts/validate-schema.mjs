#!/usr/bin/env node
import SwaggerParser from '@apidevtools/swagger-parser';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SCHEMA_PATH = resolve(process.cwd(), 'schemas/plex-media-server.openapi.json');

async function main() {
  console.log(`Validating ${SCHEMA_PATH}...`);

  const raw = readFileSync(SCHEMA_PATH, 'utf-8');
  JSON.parse(raw); // Ensure strict JSON syntax

  await SwaggerParser.validate(SCHEMA_PATH);
  console.log('✅ OpenAPI schema is valid.');

  const api = await SwaggerParser.parse(SCHEMA_PATH);
  const pathCount = Object.keys(api.paths || {}).length;
  const schemaCount = Object.keys(api.components?.schemas || {}).length;
  console.log(`Paths: ${pathCount}, Schemas: ${schemaCount}`);
}

main().catch((err) => {
  console.error('❌ Schema validation failed:', err.message);
  process.exit(1);
});
