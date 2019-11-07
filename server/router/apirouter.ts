import axios from 'axios';
import Router, { IRouterContext } from 'koa-router';
import configs from '../../configUrls';

const { request_token_url, client_id, client_secret, user_base_url } = configs.github;
const router = new Router();

interface ICtx {
    session: {
        userInfo: any;
        githubAuth: any;
        [props: string]: any;
    };
}
// 获取用户信息
router.get('/user/info', async (ctx: IRouterContext & ICtx) => {
    const user = ctx.session.userInfo;
    if (!user) {
        ctx.status = 401;
        ctx.body = 'Need Login';
    } else {
        ctx.body = user;
        ctx.set('Content-Type', 'application/json');
    }
});
// oauth回调处理,根据code+client_id+lient_secret计算token
router.get('/auth', async (ctx: IRouterContext & ICtx) => {
    try {
        // ctx.body = "auth 验证信息";
        const code = ctx.query.code;
        if (!code) {
            ctx.body = 'code no exist';
            return;
        }
        // 1.oauth认证,存入session
        const result = await axios({
            method: 'POST',
            url: request_token_url,
            data: {
                client_id,
                client_secret,
                code
            },
            headers: {
                Accept: 'application/json'
            }
        });
        if (result.status !== 200 || result.data.error) {
            throw new Error(result.data.error);
        }
        ctx.session.githubAuth = result.data;
        // 2.获取用户信息,存入session
        const { access_token, token_type } = result.data;
        const userInfoResult = await axios({
            method: 'GET',
            url: user_base_url,
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        });
        // 鉴权成功,跳转回首页
        ctx.session.userInfo = userInfoResult.data;
        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/');
        ctx.session.urlBeforeOAuth = '';
    } catch (err) {
        ctx.body = `request token failed ${err}`;
    }
});
// 退出登录接口
router.post('/logout', async (ctx: IRouterContext & ICtx) => {
    console.log('logout');
    ctx.session = null;
    ctx.body = `logout seccess`;
});
router.all('/github', async (ctx: IRouterContext & ICtx) => {
    console.log('进入到github');
    let c = ctx;
});

export default router;
