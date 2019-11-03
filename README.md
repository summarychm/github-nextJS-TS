## github-nextJS-TS

    使用React Hooks+TypeScript+next.js+KOA2+Oauth2 实现的simple-web-github

### 所用 package

    npm install -S react react-dom  antd
    npm install -S redux react-redux redux-thunk typesafe-actions
    npm install -S next @zeit/next-css @zeit/next-typescript
    npm install -S ioredis jest axios moment markdown-it atob github-markdown-css
    npm install -S koa koa-router koa-session koa-body

    npm install -D cross-env nodemon redux-devtools-extension
    npm install -D eslint prettier typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy eslint-plugin-react eslint-plugin-react-hooks

### TODO List

[] 使用 dva 对项目进行重构,减少 redux 的样板代码,将分散的 code 集中起来

[search-repositories-API](https://developer.github.com/v3/search/#search-repositories)
