const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const fontforge = require('fontfacegen/lib/fontforge');
const convert_ttf = require('fontfacegen/lib/ttf');
const convert_eot = require('fontfacegen/lib/ttf2eot');
const convert_woff = require('fontfacegen/lib/ttf2woff');

const GIT_IGNORE = `\
*.ttf
*.otf
*.eot
*.woff
*.woff2
!src/*.ttf
!src/*.otf`;

const exists = async path => {
  try {
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};
const read = async path => {
  const fp = await fs.promises.open(path, 'r');
  const result = await fp.readFile();
  await fp.close();
  return result;
};
const read_json = async path => JSON.parse(await read(path));
const write = async (path, data) => {
  const fp = await fs.promises.open(path, 'w');
  await fp.writeFile(data);
  await fp.close();
};
const write_json = async (path, data) =>
  await write(path, JSON.stringify(data));

const convert_woff2 = (source_path, dest_path) => {
  child_process.exec(
    `woff2_compress ${source_path}`,
    (error, stdout, stderr) => {},
  );
  fs.rename(source_path.replace(/[to]tf$/, 'woff2'), dest_path, () => {});
};

const main = async () => {
  const packages = await fs.promises.opendir('./packages');
  for await (const package_dir of packages) {
    if (!package_dir.isDirectory()) {
      continue;
    }
    const package_dir_path = path.join(packages.path, package_dir.name);
    const metadata_path = path.join(package_dir_path, 'metadata.json');
    const packagejson_path = path.join(package_dir_path, 'package.json');
    let css = '';
    if (!(await exists(metadata_path))) {
      continue;
    }
    console.log(`${metadata_path} found`);
    const metadata = await read_json(metadata_path);
    if (await exists(packagejson_path)) {
      const { version } = await read_json(packagejson_path);
      if (version === metadata.version) {
        console.log(`same version, skip (${version})`);
        continue;
      }
    }

    const otf_based = 'otf_based' in metadata && metadata.otf_based;
    const base_font_family = metadata['font-family'];
    const font_families = [base_font_family];
    if (base_font_family.indexOf(' ') !== -1) {
      font_families.push(base_font_family.replace(/ /g, ''));
    }
    font_families.push(package_dir.name);
    for (const data of metadata.files) {
      const source_path = path.join(package_dir_path, 'src', data.filename);
      const { name } = path.parse(data.filename);
      const font_name = fontforge.getName(source_path);
      console.log(`Start: convert ${source_path}`);
      const ttf_path = path.join(package_dir_path, `${name}.ttf`);
      convert_ttf(source_path, ttf_path, font_name);
      convert_eot(ttf_path, path.join(package_dir_path, `${name}.eot`));
      convert_woff(source_path, path.join(package_dir_path, `${name}.woff`));
      convert_woff2(source_path, path.join(package_dir_path, `${name}.woff2`));
      if (otf_based) {
        fs.copyFileSync(
          source_path,
          path.join(package_dir_path, data.filename),
        );
      }
      console.log(`End: convert ${source_path}`);
      font_families.forEach(font_family => {
        css += `\
@font-face {
  font-family: '${font_family}';
  src: url(./${name}.eot);
  src: local('${font_family} '),
       local('${font_family}'),
       url(./${name}.eot?#iefix) format('embedded-opentype'),
       url(./${name}.woff2) format('woff2'),
       url(./${name}.woff) format('woff'),${
          otf_based
            ? `
       url(./${name}.otf) format('otf'),`
            : ''
        }
       url(./${name}.ttf) format('truetype');
  font-display: swap;
  font-style: ${data.style};
  font-weight: ${data.weight};
}
`;
      });
    }

    let readme = `\
# @kfonts/${package_dir.name}

${base_font_family} ????????? self-host ?????? ?????? webfont ????????? css ??????
(Webfont and css files package for self-hosting ${base_font_family} font)

## ?????? (Installation)

\`\`\`
$ npm install --save @kfonts/${package_dir.name}
\`\`\`

?????? (or)

\`\`\`
yarn add @kfonts/${package_dir.name}
\`\`\`

## Self-Host ?????? (Usage)

webpack??? ?????? ???????????? ?????????????????? ????????? ?????? ????????? ?????? ???????????????.
(In project built via webpack, You can use it below method:)

\`\`\`js
require('@kfonts/${package_dir.name}');
\`\`\`

?????? (or)

\`\`\`js
import '@kfonts/${package_dir.name}';
\`\`\`

??? ?????? CSS ????????? ????????? ?????? ?????? ???????????????.
(After that, You can use it like it)

\`\`\`css
body {
    font-family: ${font_families.map(f => `"${f}"`).join(', ')};
}
\`\`\`

### ???????????? (Warning)

css-loader ????????? ?????? ??????, ???????????? ????????? ????????? ?????? ????????? ???????????????.
css-loader??? ????????? ????????????, ??????????????? ?????? ?????? ???????????? ??????????????????.
(If you use low version css-loader, you can not use fontname contains spaces.
I might upgrade css-loader or use alternative font name.)

## Self-Host??? ??? ??? ?????? ????????? ????????? (Usage without self-host)

????????? HTML??? \`<head>\` ?????? ????????? ??????????????????.
(Insert this HTML in \`<head>\` tag.)

\`\`\`html
<link rel="stylesheet" href="https://unpkg.com/@kfonts/${
      package_dir.name
    }/index.css" />
\`\`\`
`;

    const license_path = path.join(package_dir_path, 'LICENSE');
    const { license_link } = metadata;
    let license_text = '';

    if (await exists(license_path)) {
      license_text = await read(license_path);
    }
    if (license_link || license_text) {
      readme += `
## License

`;
      if (license_link) {
        readme += `[Link](${license_link})`;
      }
      if (license_text) {
        readme += `

\`\`\`
${license_text}
\`\`\`
`;
      }
    }
    await write(path.join(package_dir_path, 'README.md'), readme);
    await write(path.join(package_dir_path, 'index.css'), css);
    await write(path.join(package_dir_path, '.gitignore'), GIT_IGNORE);
    await write(path.join(package_dir_path, '.npmignore'), '');
    await write_json(packagejson_path, {
      name: `@kfonts/${package_dir.name}`,
      version: metadata.version,
      description: `${base_font_family} typeface`,
      main: 'index.css',
      keywords: [
        '@kfonts',
        'kfonts',
        'typeface',
        'font',
        'font family',
        'webfont',
        'korean',
        '??????',
        '??????',
        package_dir.name,
        base_font_family,
      ],
      author: 'Kim, Jinsu <item4_hun@hotmail.com>',
      license: 'SEE LICENSE IN LICENSE',
      repository: `https://github.com/item4/kfonts/tree/main/packages/${package_dir.name}`,
    });
  }
};
main().catch(console.error);
