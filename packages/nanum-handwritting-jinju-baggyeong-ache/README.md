
@kfonts/nanum-handwritting-jinju-baggyeong-ache
---------------------

나눔손글씨 진주 박경아체 폰트를 self-host 하기 위한 webfont 파일과 css 파일

설치
----

```
$ npm install --save @kfonts/nanum-handwritting-jinju-baggyeong-ache
```

혹은

```
yarn add @kfonts/nanum-handwritting-jinju-baggyeong-ache
```

Self-Host 사용법
---------------

webpack을 통해 빌드되는 프로젝트에서 다음과 같은 형태로 사용 가능합니다.

```js
require('@kfonts/nanum-handwritting-jinju-baggyeong-ache');
```

혹은

```js
import '@kfonts/nanum-handwritting-jinju-baggyeong-ache';
```

그 후에 CSS 안에서 다음과 같이 사용 가능합니다.

```css
body {
    font-family: '나눔손글씨 진주 박경아체', '나눔손글씨진주박경아체', 'nanum-handwritting-jinju-baggyeong-ache';
}
```

주의
++++

css-loader 버전이 낮은 경우, 폰트명에 공백이 있으면 폰트 사용이 불가합니다.
css-loader의 버전을 올리거나, 띄어쓰기가 없는 대체 폰트명을 사용해주세요.

Self-Host를 할 수 없는 경우의 사용법
--------------------------------

다음의 HTML을 `<head>` 태그 내부에 삽입해주세요.

```html
<link rel="stylesheet" href="https://unpkg.com/@kfonts/nanum-handwritting-jinju-baggyeong-ache/index.css" />
```

