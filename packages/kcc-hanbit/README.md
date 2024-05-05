# @kfonts/kcc-hanbit

[![@kfonts/kcc-hanbit on npmjs.com](https://img.shields.io/npm/v/%40kfonts%2Fkcc-hanbit)](https://www.npmjs.com/package/@kfonts/kcc-hanbit)

The CSS and web font files for using &OpenCurlyDoubleQuote;KCC-한빛&CloseCurlyDoubleQuote; font on your website without external resource.

## Quick Start

### Installation

```sh
# npm
npm install --save @kfonts/kcc-hanbit

# yarn
yarn add @kfonts/kcc-hanbit

# pnpm
pnpm install @kfonts/kcc-hanbit
```

### Embeding

```js
// ES6+ with import assertion
import '@kfonts/kcc-hanbit' assert { type: 'css' };

// ES6+
import '@kfonts/kcc-hanbit';

// CommonJS
require('@kfonts/kcc-hanbit');
```

### Styling

```css
body {
  font-family: 'KCC-한빛', 'KCC-Hanbit', cursive;
}
```

## Without self-host

If you can not use self-host method but want to this font, you can embed this from unpkg.

```html
<link rel="stylesheet" href="https://unpkg.com/@kfonts/kcc-hanbit/index.css" />
```

## Original font

Original font can download here: [공유마당 무료폰트 자료실](https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13371550&menuNo=200195)

## Licence

OFL-1.1

You can check full license description here: [Open Font License](https://openfontlicense.org/)
