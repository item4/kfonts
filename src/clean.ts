import { opendir, rm } from 'node:fs/promises';
import path from 'node:path';

import { getPackages } from '@/fs.ts';

async function main() {
  for await (const directory of getPackages()) {
    const files = await opendir(path.join(directory.path, directory.name));
    for await (const file of files) {
      if (file.isDirectory()) {
        continue;
      }
      if (/\.[ot]tf$/.test(file.name.toLowerCase())) {
        await rm(path.join(file.path, file.name));
      }
    }
  }
}
await main();
