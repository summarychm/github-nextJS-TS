"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const next_1 = __importDefault(require("next"));
const koa_1 = __importDefault(require("koa"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_router_1 = __importDefault(require("koa-router"));
const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const redis = new ioredis_1.default();
const nextApp = next_1.default({ dev });
const nextHandle = nextApp.getRequestHandler();
require("./routerEvents"); // 注册路由钩子log
const apirouter_1 = __importDefault(require("./router/apirouter"));
const session_store_1 = __importDefault(require("./session-store"));
const request_1 = require("../lib/request");
// 等待next准备完成
nextApp.prepare().then(() => {
    const koa = new koa_1.default(); // koa 实例
    koa.keys = ['next.js koa ts redis'];
    const sessionConfig = {
        key: 'sid',
        store: new session_store_1.default(redis)
    };
    let routers = new koa_router_1.default();
    routers.use('/api', apirouter_1.default.routes());
    // middleware
    koa.use(koa_body_1.default()); // body解析
    koa.use(koa_session_1.default(sessionConfig, koa));
    koa.use(routers.routes());
    koa.use(routers.allowedMethods());
    koa.use(async (ctx, next) => {
        let { path, method, url, request } = ctx;
        if (path.startsWith('/github/')) {
            url = url.replace('/github/', '/');
            console.log('当前接口非内部接口,地址为:', url);
            const session = ctx.session;
            const githubAuth = session && session.githubAuth;
            const headers = {};
            if (githubAuth && githubAuth.access_token) {
                headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`;
            }
            const result = await request_1.requestGithub(method, url, ctx.request.body || {}, headers);
            ctx.status = result.status;
            ctx.body = result.data;
        }
        else
            await next();
    });
    // 对于未捕获的路由全部交由next.js处理
    koa.use(async (ctx) => {
        if (!ctx.body) {
            ctx.req['session'] = ctx.session;
            // 将node原生的res,req传入next.js中
            await nextHandle(ctx.req, ctx.res);
            ctx.respond = false;
        }
    });
    koa.listen(port, () => {
        console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
    });
    koa.on('error', function (error) {
        console.log('============ error begin ====================');
        console.log(error);
        console.log('============ error end ======================');
    });
});
//# sourceMappingURL=index.js.map