import type { GenericFamily, Style, Weight } from '@/types/font.js';

export interface FileData {
  filename: string;
  style: Style;
  weight: Weight;
  version: string;
}

export interface Metadata {
  name: string;
  version: string;
  family: string[];
  generic: GenericFamily;
  format: 'otf' | 'ttf';
  homepage: {
    name: string;
    url: string;
  };
  license: {
    spdx: 'OFL-1.1' | null;
    name: string;
    url: string;
  };
  files: FileData[];
}
