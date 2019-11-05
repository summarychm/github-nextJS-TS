"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const koa_router_1 = __importDefault(require("koa-router"));
const configUrls_1 = __importDefault(require("../../configUrls"));
const { request_token_url, client_id, client_secret, user_base_url } = configUrls_1.default.github;
const router = new koa_router_1.default();
// 获取用户信息
router.get("/user/info", async (ctx) => {
    const user = ctx.session.userInfo;
    if (!user) {
        ctx.status = 401;
        ctx.body = "Need Login";
    }
    else {
        ctx.body = user;
        ctx.set("Content-Type", "application/json");
    }
});
// oauth回调处理,根据code+client_id+lient_secret计算token
router.get("/auth", async (ctx) => {
    try {
        // ctx.body = "auth 验证信息";
        const code = ctx.query.code;
        if (!code)
            return (ctx.body = "code no exist");
        // 1.oauth认证,存入session
        const result = await axios_1.default({
            method: "POST",
            url: request_token_url,
            data: {
                client_id,
                client_secret,
                code,
            },
            headers: {
                Accept: "application/json",
            },
        });
        if (result.status !== 200 || result.data.error) {
            throw new Error(result.data.error);
        }
        ctx.session.githubAuth = result.data;
        // 2.获取用户信息,存入session
        const { access_token, token_type } = result.data;
        const userInfoResult = await axios_1.default({
            method: "GET",
            url: user_base_url,
            headers: {
                Authorization: `${token_type} ${access_token}`,
            },
        });
        // 鉴权成功,跳转回首页
        ctx.session.userInfo = userInfoResult.data;
        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || "/");
        ctx.session.urlBeforeOAuth = "";
    }
    catch (err) {
        ctx.body = `request token failed ${err}`;
    }
});
// 退出登录接口
router.post("/logout", async (ctx) => {
    console.log("logout");
    ctx.session = null;
    ctx.body = `logout seccess`;
});
router.all("/github", async (ctx) => {
    console.log("进入到github");
    let c = ctx;
});
exports.default = router;
//# sourceMappingURL=apirouter.js.map