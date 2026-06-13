#!/usr/bin/env node
import SwaggerParser from '@apidevtools/swagger-parser';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function findSpecPath() {
  const cwd = process.cwd();
  const candidates = [
    resolve(cwd, 'plex-media-server.openapi.json'),
    resolve(cwd, 'spec/plex-media-server.openapi.json'),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return candidates[0];
}

const SCHEMA_PATH = process.argv[2] ? resolve(process.cwd(), process.argv[2]) : findSpecPath();

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
