import type { GenericFamily } from '@/types/font.ts';
import type { Metadata } from '@/types/metadata.ts';

import child_process from 'node:child_process';
import { opendir } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

import { getFontVersion } from '@/fontforge.ts';
import { exists, getPackages, readJSON, writeJSON } from '@/fs.ts';

const exec = promisify(child_process.exec);

const STRING_PATTERN = /"(.+?)"\(s\)/g;
const KNOWN_GENERIC_TYPE: Record<string, GenericFamily> = {
  '배달의민족 연성': 'serif',
  '배달의민족 주아': 'cursive',
  '배달의민족 한나는 열한살': 'sans-serif',
  '배달의민족 도현': 'sans-serif',
  '배달의민족 기랑해랑': 'cursive',
  '배달의민족 한나체 air': 'sans-serif',
  '배달의민족 한나체 pro': 'sans-serif',
  '배민 을지로10년후체': 'cursive',
  '배달의민족 을지로체': 'cursive',
  d2coding: 'monospace',
  'd2coding ligature': 'monospace',
  배찌체: 'cursive',
  메이플스토리: 'cursive',
  '마루 부리': 'serif',
  '학교안심 곧은제목': 'sans-serif',
};

async function main() {
  for await (const directory of getPackages()) {
    const packagePath = path.join(directory.parentPath, directory.name);
    const metadataPath = path.join(packagePath, 'metadata.json');
    if (!(await exists(metadataPath))) {
      const sourceDirectory = path.join(packagePath, 'src');
      if (!(await exists(sourceDirectory))) {
        continue;
      }
      const tempMetadata: Metadata = {
        name: directory.name,
        family: [],
        generic: 'cursive',
        files: [],
        version: '0.0.0',
        format: 'ttf',
        homepage: {
          name: '',
          url: '',
        },
        license: {
          spdx: 'OFL-1.1',
          name: '',
          url: '',
        },
      };
      const fonts = await opendir(sourceDirectory);
      for await (const font of fonts) {
        tempMetadata.files.push({
          filename: font.name,
          weight: 400,
          style: 'normal',
          version: '0.0',
        });
        if (font.name.endsWith('.otf')) {
          tempMetadata.format = 'otf';
        }
        await writeJSON(metadataPath, tempMetadata);
      }
    }
    const metadata: Metadata = await readJSON(metadataPath);
    const fontFamilySet: Set<string> = new Set();
    for (const file of metadata.files) {
      const fontPath = path.join(packagePath, 'src', file.filename);
      const { stdout } = await exec(`fc-query ${fontPath}`);
      const rawFamily = /\s+family: (.+)$/m.exec(stdout)![1];
      const rawFamilyLang = /\s+familylang: (.+)$/m.exec(stdout)![1];
      const rawStyle = /\s+style: (.+)$/m.exec(stdout)![1];
      const familyNames = [...rawFamily.matchAll(STRING_PATTERN)].map(matched => matched[1]);
      const familyLangNames = [...rawFamilyLang.matchAll(STRING_PATTERN)].map(matched => matched[1]);
      const styleNames = new Set([...rawStyle.matchAll(STRING_PATTERN)].map(matched => matched[1]));
      const weight = Number(stdout.match(/^\s+weight: (\d+(?:\.\d+)?)\(f\)\(s\)$/m)![1]);
      if (weight < 40) {
        file.weight = 100;
      } else if (weight < 50) {
        file.weight = 200;
      } else if (weight < 80) {
        file.weight = 300;
      } else if (weight < 100) {
        file.weight = 400;
      } else if (weight < 180) {
        file.weight = 500;
      } else if (weight < 200) {
        file.weight = 600;
      } else if (weight < 205) {
        file.weight = 700;
      } else if (weight < 210) {
        file.weight = 800;
      } else if (weight < 215) {
        file.weight = 900;
      } else {
        file.weight = 1000;
      }
      if (styleNames.has('UltraLight') || styleNames.has('ExtraLight')) {
        file.weight = 200;
      } else if (styleNames.has('Light')) {
        file.weight = 300;
      } else if (styleNames.has('UltraBold') || styleNames.has('ExtraBold')) {
        file.weight = 800;
      } else if (styleNames.has('Bold')) {
        file.weight = 700;
      }
      file.version = await getFontVersion(fontPath);
      const names = Array.from({ length: familyNames.length })
        .map((_, index) => [familyNames[index], familyLangNames[index]])
        .sort((a, b) => b[1].localeCompare(a[1]))
        .map(([family]) => family)
        .filter((name, _, array) => !array.filter(n => n.length < name.length).some(n => name.startsWith(n)));
      for (const name of names) {
        fontFamilySet.add(name);
      }
    }

    if (fontFamilySet.has('Nanum HeuinGgoRiSuRi')) {
      // 나눔손글씨 흰꼬리수리 폰트에 한글 family name이 누락되어있어서 work-around
      fontFamilySet.delete('Nanum HeuinGgoRiSuRi');
      fontFamilySet.add('나눔손글씨 흰꼬리수리');
      fontFamilySet.add('Nanum HeuinGgoRiSuRi');
    }
    if (fontFamilySet.has('DAEHWA_NANUM_SHARING2023_10_FONT')) {
      // 대화나눔체 work-around
      fontFamilySet.clear();
      fontFamilySet.add('대화나눔');
      fontFamilySet.add('Daehwa Nanum');
    }
    metadata.name = directory.name;
    metadata.family = [...fontFamilySet];
    metadata.generic = (() => {
      for (const name of metadata.family) {
        const stripName = name.toLowerCase().replace(/\s*otf$/, '');
        if (stripName in KNOWN_GENERIC_TYPE) {
          return KNOWN_GENERIC_TYPE[stripName];
        }
        if (stripName.startsWith('나눔손글씨')) {
          return 'cursive';
        }
        if (stripName.includes('명조') || stripName.includes('바탕')) {
          return 'serif';
        }
        if (
          stripName.includes('돋움') ||
          stripName.includes('고딕') ||
          stripName.includes('스퀘어') ||
          stripName.includes('sans')
        ) {
          return 'sans-serif';
        }
        if (/\bcode\b/.test(stripName)) {
          return 'monospace';
        }
      }
      return 'cursive';
    })();
    await writeJSON(metadataPath, metadata);
  }
}
await main();
