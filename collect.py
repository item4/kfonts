import json
import pathlib
import shutil

result = []
web_src = pathlib.Path('./web/src')
web_packages = web_src / 'packages'
web_packages.mkdir(exist_ok=True)
for package in pathlib.Path('./packages').iterdir():
    if not package.is_dir():
        continue

    meta_file = package / 'metadata.json'
    with meta_file.open('r') as f:
        meta = json.load(f)
    web_package = web_packages / package.name
    web_package.mkdir(exist_ok=True)
    css_bodies = []
    for file_data in meta['files']:
        name = file_data['filename'].split('.')[0]
        src1 = package / f'{name}.woff'
        dst1 = web_package / f'{name}.woff'
        src2 = package / f'{name}.woff2'
        dst2 = web_package / f'{name}.woff2'
        shutil.copy(src1, dst1)
        shutil.copy(src2, dst2)
        font_family = meta['font-family']
        font_families = [font_family]
        if ' ' in font_family:
            font_families.append(font_family.replace(' ', ''))
        font_families.append(package.name)
        for f_family in font_families:
            css_bodies.append("""
@font-face {open}
  font-family: '{f_family}';
  src: local('{f_family} '),
       local('{f_family}'),
       url(./{name}.woff2) format('woff2'),
       url(./{name}.woff) format('woff');
  font-display: swap;
  font-style: {style};
  font-weight: {weight};
{close}
""".format(
    open='{',
    close='}',
    f_family=f_family,
    name=name,
    style=file_data['style'],
    weight=file_data['weight'],
))
    with (web_package / 'index.css').open('w') as f:
        f.write('\n'.join(css_bodies))
    
    result.append((package.name, meta['font-family']))

result = sorted(result, key=lambda x: x[0])

result_file = pathlib.Path('./web/src/fonts.json')
with result_file.open('w') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
