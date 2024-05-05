import { access, constants, open, opendir } from 'node:fs/promises';
import path from 'node:path';

export const exists = async (file: string) => {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};
export const read = async (file: string) => {
  const fp = await open(file, 'r');
  const result = await fp.readFile({ encoding: 'utf8' });
  await fp.close();
  return result;
};
export const readJSON = async (file: string) => JSON.parse(await read(file));
export const write = async (file: string, data: string) => {
  const fp = await open(file, 'w');
  await fp.writeFile(data);
  await fp.close();
};
export const writeJSON = async (file: string, data: object) =>
  await write(file, JSON.stringify(data, undefined, 2) + '\n');
export const cwd = process.cwd();
export async function* getPackages() {
  const packages = await opendir(path.join(cwd, 'packages'));
  for await (const item of packages) {
    if (!item.isDirectory()) {
      continue;
    }
    yield item;
  }
}
