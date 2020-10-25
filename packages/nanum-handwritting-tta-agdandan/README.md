# @kfonts/nanum-handwritting-tta-agdandan

나눔손글씨 따악단단 폰트를 self-host 하기 위한 webfont 파일과 css 파일
(Webfont and css files package for self-hosting 나눔손글씨 따악단단 font)

## 설치 (Installation)

```
$ npm install --save @kfonts/nanum-handwritting-tta-agdandan
```

혹은 (or)

```
yarn add @kfonts/nanum-handwritting-tta-agdandan
```

## Self-Host 방법 (Usage)

webpack을 통해 빌드되는 프로젝트에서 다음과 같은 형태로 사용 가능합니다.
(In project built via webpack, You can use it below method:)

```js
require('@kfonts/nanum-handwritting-tta-agdandan');
```

혹은 (or)

```js
import '@kfonts/nanum-handwritting-tta-agdandan';
```

그 후에 CSS 안에서 다음과 같이 사용 가능합니다.
(After that, You can use it like it)

```css
body {
    font-family: "나눔손글씨 따악단단", "나눔손글씨따악단단", "nanum-handwritting-tta-agdandan";
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
<link rel="stylesheet" href="https://unpkg.com/@kfonts/nanum-handwritting-tta-agdandan/index.css" />
```

## License

[Link](https://clova.ai/handwriting/list.html)

```
나눔손글씨 글꼴은 기업 및 단체 또는 개인 누구나 무료로 사용할 수 있습니다.
다만, 나눔손글씨 글꼴을 유상으로 제공, 판매, 배포하는 것은 금지됩니다.

```
