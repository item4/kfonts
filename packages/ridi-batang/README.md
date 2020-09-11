# @kfonts/ridi-batang

리디바탕 폰트를 self-host 하기 위한 webfont 파일과 css 파일
(Webfont and css files package for self-hosting 리디바탕 font)

## 설치 (Installation)

```
$ npm install --save @kfonts/ridi-batang
```

혹은 (or)

```
yarn add @kfonts/ridi-batang
```

## Self-Host 방법 (Usage)

webpack을 통해 빌드되는 프로젝트에서 다음과 같은 형태로 사용 가능합니다.
(In project built via webpack, You can use it below method:)

```js
require('@kfonts/ridi-batang');
```

혹은 (or)

```js
import '@kfonts/ridi-batang';
```

그 후에 CSS 안에서 다음과 같이 사용 가능합니다.
(After that, You can use it like it)

```css
body {
    font-family: "리디바탕", "ridi-batang";
}
```

### 주의사항 (Warning)

css-loader 버전이 낮은 경우, 폰트명에 공백이 있으면 폰트 사용이 불가합니다.
css-loader의 버전을 올리거나, 띄어쓰기가 없는 대체 폰트명을 사용해주세요.
(If you use low version css-loader, you can not use fontname contains spaces.
I might upgrade css-loader or use alternative font name.)

## Self-Host를 할 수 없는 경우의 사용법 (Usage without self-host)

다음의 HTML을 `<head>` 태그 내부에 삽입해주세요.
(Insert this HTML in `<head>` tag.)

```html
<link rel="stylesheet" href="https://unpkg.com/@kfonts/ridi-batang/index.css" />
```

## License

[Link](https://www.ridicorp.com/branding/fonts/ridibatang/)

```
리디바탕 글꼴은 개인 및 기업 사용자를 포함한 모든 사용자에게 무료로 제공되며 자유롭게 수정하고 재배포하실 수 있습니다. 단, 글꼴 자체를 유료로 판매하는 것은 금지하며, 리디바탕 글꼴은 본 저작권 안내와 라이선스 전문을 포함해서 다른 소프트웨어와 번들하거나 재배포 또는 판매가 가능합니다. 라이선스 전문을 포함하기 어려울 경우, 리디바탕 글꼴의 출처 표기를 권장합니다. 예) 이 페이지는 리디주식회사에서 제공한 리디바탕 글꼴이 사용되어 있습니다.

This Font Software is licensed under the SIL Open Font License, Version 1.1.

리디바탕의 저작권은 리디주식회사가 소유하고 있습니다.

```
