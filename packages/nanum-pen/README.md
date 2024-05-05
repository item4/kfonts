# @kfonts/nanum-pen

[![@kfonts/nanum-pen on npmjs.com](https://img.shields.io/npm/v/%40kfonts%2Fnanum-pen)](https://www.npmjs.com/package/@kfonts/nanum-pen)

The CSS and web font files for using &OpenCurlyDoubleQuote;나눔손글씨 펜&CloseCurlyDoubleQuote; font on your website without external resource.

## Quick Start

### Installation

```sh
# npm
npm install --save @kfonts/nanum-pen

# yarn
yarn add @kfonts/nanum-pen

# pnpm
pnpm install @kfonts/nanum-pen
```

### Embeding

```js
// ES6+ with import assertion
import '@kfonts/nanum-pen' assert { type: 'css' };

// ES6+
import '@kfonts/nanum-pen';

// CommonJS
require('@kfonts/nanum-pen');
```

### Styling

```css
body {
  font-family: '나눔손글씨 펜', 'Nanum Pen Script', cursive;
}
```

## Without self-host

If you can not use self-host method but want to this font, you can embed this from unpkg.

```html
<link rel="stylesheet" href="https://unpkg.com/@kfonts/nanum-pen/index.css" />
```

## Original font

Original font can download here: [네이버 글꼴 모음](https://hangeul.naver.com/font)

## Licence

OFL-1.1

You can check full license description here: [네이버 나눔글꼴 라이선스안내](https://help.naver.com/service/30016/contents/18088?osType=PC&lang=ko)
