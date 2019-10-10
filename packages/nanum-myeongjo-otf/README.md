
seoche-nanum-myeongjo-otf
---------------------

나눔명조OTF 폰트를 self-host 하기 위한 webfont 파일과 css 파일

설치
----

```
$ npm install --save seoche-nanum-myeongjo-otf
```

혹은

```
yarn add seoche-nanum-myeongjo-otf
```

사용
----

webpack을 통해 빌드되는 프로젝트에서 다음과 같은 형태로 사용 가능합니다.

```js
require('seoche-nanum-myeongjo-otf');
```

혹은

```js
import 'seoche-nanum-myeongjo-otf';
```

그 후에 CSS 안에서 다음과 같이 사용 가능합니다.

```css
body {
    font-family: '나눔명조OTF';
}
```
