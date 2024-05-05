# @kfonts/maruburi

[![@kfonts/maruburi on npmjs.com](https://img.shields.io/npm/v/%40kfonts%2Fmaruburi)](https://www.npmjs.com/package/@kfonts/maruburi)

The CSS and web font files for using &OpenCurlyDoubleQuote;마루 부리&CloseCurlyDoubleQuote; font on your website without external resource.

## Quick Start

### Installation

```sh
# npm
npm install --save @kfonts/maruburi

# yarn
yarn add @kfonts/maruburi

# pnpm
pnpm install @kfonts/maruburi
```

### Embeding

```js
// ES6+ with import assertion
import '@kfonts/maruburi' assert { type: 'css' };

// ES6+
import '@kfonts/maruburi';

// CommonJS
require('@kfonts/maruburi');
```

### Styling

```css
body {
  font-family: '마루 부리', 'MaruBuri', serif;
}
```

## Without self-host

If you can not use self-host method but want to this font, you can embed this from unpkg.

```html
<link rel="stylesheet" href="https://unpkg.com/@kfonts/maruburi/index.css" />
```

## Original font

Original font can download here: [네이버 글꼴모음](https://hangeul.naver.com/fonts/search?f=maru)

## Licence

OFL-1.1

You can check full license description here: [Open Font License](https://help.naver.com/service/30016/contents/18088?osType=PC&lang=ko)
