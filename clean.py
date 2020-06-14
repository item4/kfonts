import json
import pathlib

for package_dir in pathlib.Path('./packages').iterdir():
    if not package_dir.is_dir():
        continue
    with (package_dir / 'metadata.json').open('r') as f:
        meta = json.load(f)
    preserve = ['metadata.json', 'LICENSE']
    preserve += [data['filename'] for data in meta['files']]
    for f in package_dir.iterdir():
        if f.name not in preserve:
            f.unlink()
