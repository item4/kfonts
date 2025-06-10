import { opendir, rm } from 'node:fs/promises';
import path from 'node:path';

import { getPackages } from '@/fs.ts';

async function main() {
  for await (const directory of getPackages()) {
    const files = await opendir(path.join(directory.parentPath, directory.name));
    for await (const file of files) {
      if (file.isDirectory()) {
        continue;
      }
      if (/\.[ot]tf$/.test(file.name.toLowerCase())) {
        await rm(path.join(file.parentPath, file.name));
      }
    }
  }
}
await main();
