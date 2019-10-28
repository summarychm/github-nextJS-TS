## github-nextJS-TS

    使用hooks+TS+next.js+KOA+Oauth实现的github-web

### 所用 package

    npm install -S react react-dom next @zeit/next-css @zeit/next-typescript
    npm install -D cross-env nodemon redux-devtools-extension eslint eslint-plugin-react eslint-plugin-react-hooks
    npm install -S ioredis jest
    npm install -S koa koa-router koa-session koa-body
    npm install -S redux react-redux redux-thunk typesafe-actions
    npm install -S antd axios

### TODO List

[x] :sparkles:测试连接 redis  
[x] :sparkles:创建 Container 组件,根据 Component(ReactElement/string)属性动态创建组件并将 children 作为自身属性渲染,减少 dom 层次,提升灵活性
[x] :sparkles:支持 githubOauth 登录.并将 oauth 信息写入 redux.

[x] :zap:配置 ts&webpack,支持 alias,方便开发  
[x] :zap:配置 ts+nodemen 开发 server 的开发环境  
[x] :zap:将 static 移动到 public 目录下[refer](https://github.com/zeit/next.js/blob/master/errors/static-dir-deprecated.md)  
[x] :zap:移除对@zeit/next-typescript 的依赖,next.js 新版已经内置对 ts 的支持  
[x] :zap:移除\_app.tsx 中 Container 标签,新版直接写 return Component  
[x] :zap:引入了 eslint 进行校验,并加入 react-hooks 的校验规则  
[x] :zap:将公共样式抽离到单独的 css 文件中  
[x] :zap:将 redux-dev-tools 的引入方式改为使用 redux-devtools-extension 这个 package,因为 next.js+ts 环境下 window is not defined
[x] :zap:将 Server 的路由抽离为单独的 routers.ts 文件,便于拓展.

[x] :bug:在 Request 时将 session 写入 redux,并发下给 Client 端,Client 基于该 state 创建 redux
