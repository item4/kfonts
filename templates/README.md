# %%packageName%%

[![%%packageName%% on npmjs.com](https://img.shields.io/npm/v/%%encodedPackageName%%)](https://www.npmjs.com/package/%%packageName%%)

The CSS and web font files for using &OpenCurlyDoubleQuote;%%primaryFamilyName%%&CloseCurlyDoubleQuote; font on your website without external resource.

## Quick Start

### Installation

```sh
# npm
npm install --save %%packageName%%

# yarn
yarn add %%packageName%%

# pnpm
pnpm install %%packageName%%
```

### Embeding

```js
// ES6+ with import attributes
import '%%packageName%%' with { type: 'css' };

// ES6+
import '%%packageName%%';

// CommonJS
require('%%packageName%%');
```

### Styling

```css
body {
  font-family: %%usageExpression%%;
}
```

## Without self-host

If you can not use self-host method but want to this font, you can embed this from unpkg.

```html
<link rel="stylesheet" href="https://unpkg.com/%%packageName%%/index.css" />
```

## Original font

Original font can download here: [%%hompageName%%](%%homepageURL%%)

## Licence

%%license%%
