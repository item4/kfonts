import type { Metadata } from '@/types/metadata.ts';

import child_process from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import * as process from 'node:process';

import { convert_woff } from '@/fontforge.ts';
import { exists, getPackages, readJSON, read, write, writeJSON } from '@/fs.ts';

const convert_woff2 = (source_path: string, destination_path: string): Promise<void> => {
  return new Promise<void>(resolve => {
    child_process.exec(`woff2_compress ${source_path}`, () => {
      fs.rename(source_path.replace(/\.[ot]tf$/, '.woff2'), destination_path, () => {
        resolve();
      });
    });
  });
};

const main = async () => {
  const templatesDirectory = path.join(process.cwd(), 'templates');
  const readmeTemplate = await read(path.join(templatesDirectory, 'README.md'));
  const gitIgnoreTemplate = await read(path.join(templatesDirectory, '.gitignore'));
  for await (const directory of getPackages()) {
    const package_path = path.join(directory.parentPath, directory.name);
    const metadata_path = path.join(package_path, 'metadata.json');
    const packagejson_path = path.join(package_path, 'package.json');
    let css = '';
    if (!(await exists(metadata_path))) {
      continue;
    }
    console.log(`${metadata_path} found`);
    const metadata: Metadata = await readJSON(metadata_path);
    if (await exists(packagejson_path)) {
      const { version } = await readJSON(packagejson_path);
      if (version === metadata.version) {
        console.log(`same version, skip (${version})`);
        continue;
      }
    }

    const primaryFamilyName = metadata.family[0];
    for (const data of metadata.files) {
      const { name } = path.parse(data.filename);
      const sourceList = [
        ...metadata.family.map(name => `local('${name}'), local('${name} ')`),
        `url(./${name}.woff2) format('woff2')`,
        `url(./${name}.woff) format('woff')`,
      ];
      const source_path = path.join(package_path, 'src', data.filename);

      console.log(`Start: convert ${source_path}`);
      await convert_woff(source_path, path.join(package_path, `${name}.woff`));
      await convert_woff2(source_path, path.join(package_path, `${name}.woff2`));
      console.log(`End: convert ${source_path}`);

      css += `\
@font-face {
  font-family: '${primaryFamilyName}';
  src: ${sourceList.join(', ')};
  font-display: swap;
  font-weight: ${data.weight};
}
`;
    }
    const packageName = `@kfonts/${metadata.name}`;
    const usageExpression = metadata.family.map(name => `'${name}'`).join(', ') + `, ${metadata.generic};`;

    let license = `You can check full license description here: [${metadata.license.name}](${metadata.license.url})`;
    if (metadata.license.spdx) {
      license = `${metadata.license.spdx}\n\n${license}`;
    }
    await write(
      path.join(package_path, 'README.md'),
      readmeTemplate
        .replaceAll('%%packageName%%', packageName)
        .replaceAll('%%encodedPackageName%%', encodeURIComponent(packageName))
        .replaceAll('%%primaryFamilyName%%', primaryFamilyName)
        .replaceAll('%%usageExpression%%', usageExpression)
        .replaceAll('%%hompageName%%', metadata.homepage.name)
        .replaceAll('%%homepageURL%%', metadata.homepage.url)
        .replaceAll('%%license%%', license),
    );
    await write(path.join(package_path, 'index.css'), css);
    await write(path.join(package_path, '.gitignore'), gitIgnoreTemplate);
    await write(path.join(package_path, '.npmignore'), '');
    const { version } = metadata;
    await writeJSON(packagejson_path, {
      name: `@kfonts/${directory.name}`,
      version,
      description: `${primaryFamilyName} typeface`,
      main: 'index.css',
      keywords: [
        '@kfonts',
        'font',
        'font family',
        'typeface',
        'webfont',
        'web',
        'front-end',
        'korean',
        ...metadata.family,
      ],
      author: 'item4',
      license: metadata.license.spdx ?? 'SEE LICENSE IN README.md',
      repository: `https://github.com/item4/kfonts/tree/main/packages/${directory.name}`,
    });
  }
};
await main();
