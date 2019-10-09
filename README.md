Seoches
-------

한글 폰트를 Self-host 할 수 있다!

사용법
------

1. NPM에서 원하는 폰트를 설치해주세요.
   ```
   $ npm install --save seoche-nanum-gothic-otf
   ```
2. 자신의 JavaScript 내지는 TypeScript 프로젝트에 import 해주세요.
   ```js
   import 'seoche-nanum-gothic-otf';
   ```
3. 불러온 폰트를 필요한 곳에 적용하면 끝!
   ```css
   body {
     font-family: '나눔고딕OTF';
   }
   ```

로컬에서 폰트 빌드하기
-------------------

이미 배포된 버전이 아닌, 직접 빌드한 버전을 쓰고 싶다면 다음 의존성을 확인해주세요.

- `git`
- `java`, `javac`
- `mvn` (Maven)
- `python3`
- [fontforge](http://fontforge.github.io/en-US/)

해당 요건이 충족된 상태에서 `./setup` 명령어를 실행하면 웹폰트를 설치하기 위해 필요한 프로그램이 빌드됩니다.
빌드가 완료되면 `python gen.py` 를 통해 폰트를 빌드하실 수 있습니다.
혹시라도 너무 많은 파일이 생겨 곤란하다면 `python clean.py` 를 실행해주세요.
