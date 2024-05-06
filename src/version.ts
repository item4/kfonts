import type { Metadata } from '@/types/metadata.js';

import path from 'node:path';

import { inc } from 'semver';

import { getPackages, exists, readJSON, writeJSON } from '@/fs.js';

async function main() {
  for await (const directory of getPackages()) {
    const metadataPath = path.join(directory.path, directory.name, 'metadata.json');
    if (!(await exists(metadataPath))) {
      continue;
    }
    const metadata: Metadata = await readJSON(metadataPath);
    // TODO: args from CLI
    metadata.version = inc(metadata.version, 'minor') || metadata.version;
    await writeJSON(metadataPath, metadata);
  }
}
await main();
