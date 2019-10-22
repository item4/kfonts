#!/usr/bin/env python

import json
import sys
import os
import os.path
import subprocess
from pathlib import Path

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
VENDOR_DIR = os.path.join(BASE_DIR, 'vendor')
SFNTLY_CLASSPATH = ':'.join([
    os.path.join(BASE_DIR, 'src'),
    os.path.join(VENDOR_DIR, 'sfntly', 'java', 'target', 'classes')
])
WOFF2_COMPRESS_PATH = os.path.join(VENDOR_DIR, 'woff2', 'woff2_compress')

def devnull(mode):
    return open(os.devnull, mode)

CSS_TEMPLATE = """
@font-face {open}
  font-family: '{font_family}';
  src: url(./{name}.eot);
  src: local('{font_family} '),
       local('{font_family}'),
       url(./{name}.eot?#iefix) format('embedded-opentype'),
       url(./{name}.woff2) format('woff2'),
       url(./{name}.woff) format('woff'),
       url(./{name}.{first_ext}) format('{first_format}'),
       url(./{name}.{second_ext}) format('{second_format}'),
       url(./{name}.svg#{name}) format('svg');
  font-display: swap;
  font-style: {style};
  font-weight: {weight};
{close}
"""
IGNORE_BASE = """
*.ttf
*.otf
*.svg
*.eot
*.woff
*.woff2
"""
README_TEMPLATE = """
@kfonts/{project_name}
---------------------

{name} 폰트를 self-host 하기 위한 webfont 파일과 css 파일

설치
----

```
$ npm install --save @kfonts/{project_name}
```

혹은

```
yarn add @kfonts/{project_name}
```

사용
----

webpack을 통해 빌드되는 프로젝트에서 다음과 같은 형태로 사용 가능합니다.

```js
require('@kfonts/{project_name}');
```

혹은

```js
import '@kfonts/{project_name}';
```

그 후에 CSS 안에서 다음과 같이 사용 가능합니다.

```css
body {open}
    font-family: '{name}';
{close}
```
"""

def fontforge(input_path, output_paths):
    with devnull('w') as fout:
        p = subprocess.Popen(
            ['fontforge', '-lang=ff', '-script', '-'],
            stdin=subprocess.PIPE,
            stdout=fout,
            stderr=subprocess.PIPE,
        )
        p.stdin.write('Open("{}")\nCIDFlatten()\n'.format(str(input_path)).encode())
        for output_path in output_paths:
            p.stdin.write('Generate("{}")\n'.format(str(output_path)).encode())
        p.stdin.close()
        err = p.stderr.read()
        p.stderr.close()
        if p.wait() != 0:
            raise RuntimeError(
                'FontForge conversion failed:\n'
                'Output from FontForge:\n' +
                err.decode()
            )
    # Ensure that the files were actually generated
    bad_files = [str(p) for p in output_paths if not p.is_file()]
    if bad_files:
        raise RuntimeError(
            (
                'FontForge failed to generate {}:\n'
                'Output from FontForge:\n'
                '{}'
            ).format(
                ', '.join(bad_files),
                err.decode(),
            )
        )


def sfntly(input_path, output_paths):
    command = ['java', '-cp', SFNTLY_CLASSPATH, 'ConvertFont', str(input_path)]
    for output_path in output_paths:
        command.append('-o')
        command.append(str(output_path))
    if subprocess.call(command) != 0:
        raise RuntimeError('sfntly conversion failed')



def woff2_compress(input_path):
    with devnull('r') as fin, devnull('w') as fout:
        code = subprocess.call(
            [WOFF2_COMPRESS_PATH, str(input_path)],
            stdin=fin,
            stdout=fout,
            stderr=fout,
        )
        if code != 0:
            raise RuntimeError('conversion with woff2_compress failed')


def main():
    for package_dir in Path('./packages').iterdir():
        if not package_dir.is_dir():
            continue

        metadata_file = package_dir / 'metadata.json'
        if not metadata_file.exists():
            continue

        package_json = package_dir / 'package.json'
        with metadata_file.open('r') as f:
            meta = json.load(f)
        if package_json.exists():
            with package_json.open('r') as f:
                p = json.load(f)
                if p['version'] == meta['version']:
                    continue
        css = []
        for data in meta['files']:
            input_path = package_dir / data['filename']
            name, ext = data['filename'].rsplit('.', 1)
            output_paths = []
            for fmt in {'ttf', 'otf', 'svg'}:
                output_path = package_dir / (name + os.extsep + fmt)
                if ext == fmt:
                    pass
                else:
                    output_paths.append(output_path)
            fontforge(input_path, output_paths)
            ttf_file = package_dir / (name + os.extsep + 'ttf')
            output_paths = [
                package_dir / (name + os.extsep + fmt)
                for fmt in {'woff', 'eot'}
            ]
            sfntly(ttf_file, output_paths)
            woff2_compress(ttf_file)

            otf_based = meta.get('otf_based', False)
            css.append(CSS_TEMPLATE.format(
                open='{',
                close='}',
                font_family=meta['font-family'],
                name=name,
                weight=data['weight'],
                style=data['style'],
                first_ext='otf' if otf_based else 'ttf',
                first_format='otf' if otf_based else 'truetype',
                second_ext='ttf' if otf_based else 'otf',
                second_format='truetype' if otf_based else 'otf',
            ))
        with (package_dir / 'README.md').open('w') as f:
            f.write(README_TEMPLATE.format(
                open='{',
                close='}',
                name=meta['font-family'],
                project_name=package_dir.name,
            ))
        with (package_dir / 'index.css').open('w') as f:
            f.write(''.join(css))
        with (package_dir / '.gitignore').open('w') as f:
            f.write(IGNORE_BASE + '\n'.join(
                f'!{data["filename"]}' for data in meta['files']
            ))
        with package_json.open('w') as f:
            json.dump({
                'name': f'@kfonts/{package_dir.name}',
                'version': meta['version'],
                'description': f'{meta["font-family"]} typeface',
                'main': 'index.css',
                'keywords': [
                    '@kfonts',
                    'kfonts',
                    'typeface',
                    'font',
                    'font family',
                    'webfont',
                    'korean',
                    '글꼴',
                    '서체',
                    package_dir.name,
                    meta['font-family'],
                ],
                'author': 'Kim, Jinsu <item4_hun@hotmail.com>',
                'license': 'MIT',
                'repository': f'https://github.com/item4/kfonts/tree/master/packages/{package_dir.name}',
            }, f)
        (package_dir / '.npmignore').touch()
   
if __name__ == '__main__':
    main()
