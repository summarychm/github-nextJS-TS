## github-nextJS-TS

    使用hooks+TS+next.js+KOA+Oauth实现的github-web

### 所用 package

    npm install -S react react-dom next @zeit/next-css @zeit/next-typescript
    npm install -D cross-env nodemon redux-devtools-extension eslint eslint-plugin-react eslint-plugin-react-hooks
    npm install -S ioredis jest
    npm install -S koa koa-router koa-session koa-body
    npm install -S redux react-redux redux-thunk
    npm install -S antd

### TODO List

[x] 测试连接 redis  
[x] 配置 ts&webpack,支持 alias,方便开发  
[x] 配置 ts+nodemen 开发 server 的开发环境  
[x] 将 static 移动到 public 目录下[refer](https://github.com/zeit/next.js/blob/master/errors/static-dir-deprecated.md)  
[x] 移除对@zeit/next-typescript 的依赖,next.js 新版已经内置对 ts 的支持  
[x] 移除\_app.tsx 中 Container 标签,新版直接写 return Component  
[x] 引入了 eslint 进行校验,并加入 react-hooks 的校验规则  
[x] 将公共样式抽离到单独的 css 文件中  
[x] 创建 Container 组件,根据 Component(ReactElement/string)属性动态创建组件并将 children 作为自身属性渲染,减少 dom 层次,提升灵活性  
[x] 将 redux-dev-tools 的引入方式改为使用 redux-devtools-extension 这个 package,因为 next.js+ts 环境下 window is not defined
