1. sails new 로 sails app를 만든다.
1. .vscode 를 복사한다.
1. task 폴더를 제거한다.
1. assets/index.html 파일을 만들고, routes.js 에서 '/' 라우팅을 제거한다.
- assets/index.html 파일은 .tmp/public webpack 컴파일러에 의해 pipeline으로 이동되어야 한다.
1. packages.json 에서 grunt 관련부분 패키지를 제거한다.
- sails-hook-grunt
- grunt
1. @hatiolab/sails-hook-things-shell 모듈 추가
1. webpack 관련 dependency 제거
1. config/webpack.js 추가
- outputPath를 '.tmp/public' 로 지정
1. .sails.rc 에서 public folder를 변경
  "paths": {
    "public": "."
  }
1. sails less transpiler : importer.less => importer.css 정리 필요함.
   dependencies/sails.io.js 정리 필요함.
1. graph-ql
- yarn add sails-graphql
1. ES6 사용하기
- yarn add sails-hook-babel
1. SLUG 사용하기
- yarn add sails-hook-slugs
1. DEV
- yarn add sails-hook-dev
- https://github.com/balderdashy/sails-hook-dev
