# @kfonts/nanum-pen-otf

[![@kfonts/nanum-pen-otf on npmjs.com](https://img.shields.io/npm/v/%40kfonts%2Fnanum-pen-otf)](https://www.npmjs.com/package/@kfonts/nanum-pen-otf)

The CSS and web font files for using &OpenCurlyDoubleQuote;나눔손글씨 펜 OTF&CloseCurlyDoubleQuote; font on your website without external resource.

## Quick Start

### Installation

```sh
# npm
npm install --save @kfonts/nanum-pen-otf

# yarn
yarn add @kfonts/nanum-pen-otf

# pnpm
pnpm install @kfonts/nanum-pen-otf
```

### Embeding

```js
// ES6+ with import assertion
import '@kfonts/nanum-pen-otf' assert { type: 'css' };

// ES6+
import '@kfonts/nanum-pen-otf';

// CommonJS
require('@kfonts/nanum-pen-otf');
```

### Styling

```css
body {
  font-family: '나눔손글씨 펜 OTF', 'Nanum Pen Script OTF', cursive;
}
```

## Without self-host

If you can not use self-host method but want to this font, you can embed this from unpkg.

```html
<link rel="stylesheet" href="https://unpkg.com/@kfonts/nanum-pen-otf/index.css" />
```

## Original font

Original font can download here: [네이버 글꼴 모음](https://hangeul.naver.com/font)

## Licence

OFL-1.1

You can check full license description here: [네이버 나눔글꼴 라이선스안내](https://help.naver.com/service/30016/contents/18088?osType=PC&lang=ko)
