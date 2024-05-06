import child_process from 'node:child_process';

export const fontforge = (
  source: string,
  script: string,
  target?: string,
  name?: string,
  lang?: 'ff' | 'py',
): Promise<string> => {
  let cmd = `fontforge -lang=${lang || 'ff'} -c '${script}' '${source}'`;
  if (target) {
    cmd += ` '${target}'`;
  }
  if (name) {
    cmd += ` '${name}'`;
  }
  return new Promise<string>(resolve => {
    child_process.exec(cmd, (_error, stdout) => {
      resolve(stdout);
    });
  });
};
export const getFontName = async (source: string) => {
  const result = await fontforge(source, 'Open($1);Print($fontname);');
  if (result) {
    return result.trim().replace(' ', '_');
  }
  return;
};
export const getFontVersion = async (source: string) => {
  const result = await (source.endsWith('.otf')
    ? fontforge(
        source,
        'import sys; font = fontforge.open(sys.argv[1]); print(font.cidversion);',
        undefined,
        undefined,
        'py',
      )
    : fontforge(source, 'Open($1);Print($fontversion);'));
  return result.trim();
};
export const convert_ttf = async (source: string, target: string, name: string) => {
  return await fontforge(source, 'Open($1);SetFontNames($3,$3,$3);Generate($2, "", 8);', target, name);
};
export const convert_woff = async (source: string, target: string) => {
  return await fontforge(source, 'Open($1);Generate($2, "", 8);', target);
};
