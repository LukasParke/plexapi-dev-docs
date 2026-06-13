#!/usr/bin/env node
/**
 * validate-openapi.js
 *
 * Validates the canonical Plex Media Server OpenAPI contract.
 * Run as part of CI to ensure the spec stays machine-readable and internally consistent.
 */

import SwaggerParser from '@apidevtools/swagger-parser';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SPEC_PATH = path.resolve(__dirname, '../schemas/plex-media-server.openapi.json');

async function main() {
  console.log(`Validating OpenAPI spec: ${SPEC_PATH}`);

  if (!fs.existsSync(SPEC_PATH)) {
    console.error(`Spec file not found: ${SPEC_PATH}`);
    process.exit(1);
  }

  try {
    const api = await SwaggerParser.validate(SPEC_PATH);

    const info = api.info;
    const pathCount = Object.keys(api.paths || {}).length;
    const schemaCount = Object.keys(api.components?.schemas || {}).length;

    console.log('\nValidation passed.');
    console.log(`  Title:    ${info.title}`);
    console.log(`  Version:  ${info.version}`);
    console.log(`  Paths:    ${pathCount}`);
    console.log(`  Schemas:  ${schemaCount}`);

    if (pathCount === 0) {
      console.error('\nError: spec defines no paths.');
      process.exit(1);
    }

    if (schemaCount === 0) {
      console.error('\nError: spec defines no schemas.');
      process.exit(1);
    }
  } catch (err) {
    console.error('\nValidation failed:');
    console.error(err.message);
    process.exit(1);
  }
}

main();
