# @kfonts/neodgm

[![@kfonts/neodgm on npmjs.com](https://img.shields.io/npm/v/%40kfonts%2Fneodgm)](https://www.npmjs.com/package/@kfonts/neodgm)

The CSS and web font files for using &OpenCurlyDoubleQuote;Neo둥근모&CloseCurlyDoubleQuote; font on your website without external resource.

## Quick Start

### Installation

```sh
# npm
npm install --save @kfonts/neodgm

# yarn
yarn add @kfonts/neodgm

# pnpm
pnpm install @kfonts/neodgm
```

### Embeding

```js
// ES6+ with import assertion
import '@kfonts/neodgm' assert { type: 'css' };

// ES6+
import '@kfonts/neodgm';

// CommonJS
require('@kfonts/neodgm');
```

### Styling

```css
body {
  font-family: 'Neo둥근모', 'NeoDunggeunmo', cursive;
}
```

## Without self-host

If you can not use self-host method but want to this font, you can embed this from unpkg.

```html
<link rel="stylesheet" href="https://unpkg.com/@kfonts/neodgm/index.css" />
```

## Original font

Original font can download here: [Neo둥근모 프로젝트](https://neodgm.dalgona.dev/)

## Licence

OFL-1.1

You can check full license description here: [LICENSE.txt](https://github.com/neodgm/neodgm/blob/main/LICENSE.txt)
