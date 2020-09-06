import json
import pathlib

for package_dir in pathlib.Path('./packages').iterdir():
    if not package_dir.is_dir():
        continue
    with (package_dir / 'metadata.json').open('r') as f:
        meta = json.load(f)
    major, minor, patch = map(int, meta['version'].split('.'))
    patch += 1
    meta['version'] = f'{major}.{minor}.{patch}'
    with (package_dir / 'metadata.json').open('w') as f:
        json.dump(meta, f, ensure_ascii=False, indent=4)
