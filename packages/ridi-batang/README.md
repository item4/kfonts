
@kfonts/ridi-batang
---------------------

리디바탕 폰트를 self-host 하기 위한 webfont 파일과 css 파일

설치
----

```
$ npm install --save @kfonts/ridi-batang
```

혹은

```
yarn add @kfonts/ridi-batang
```

Self-Host 사용법
---------------

webpack을 통해 빌드되는 프로젝트에서 다음과 같은 형태로 사용 가능합니다.

```js
require('@kfonts/ridi-batang');
```

혹은

```js
import '@kfonts/ridi-batang';
```

그 후에 CSS 안에서 다음과 같이 사용 가능합니다.

```css
body {
    font-family: '리디바탕', 'ridi-batang';
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
<link rel="stylesheet" href="https://unpkg.com/@kfonts/ridi-batang/index.css" />
```

