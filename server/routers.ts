import axios from "axios";
import Router, { IRouterContext } from "koa-router";
import configs from "../configUrls";

const { request_token_url, client_id, client_secret, user_base_url } = configs.github;
const router = new Router();

interface iCtx {
	session: {
		userInfo: any;
		githubAuth: any;
		[props: string]: any;
	};
}
router.get("/api/user/info", async (ctx: IRouterContext & iCtx) => {
	const user = ctx.session.userInfo;
	// const user = { name: "张三", age: 20, city: { v1: "北京", v2: "朝阳" } };
	if (!user) {
		ctx.status = 401;
		ctx.body = "Need Login";
	} else {
		ctx.body = user;
		ctx.set("Content-Type", "application/json");
	}
});

router.get("/auth", async (ctx: IRouterContext & iCtx) => {
	try {
		// ctx.body = "auth 验证信息";
		const code = ctx.query.code;
		if (!code) return (ctx.body = "code no exist");
		// 1.oauth认证,存入session
		const result = await axios({
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
		const userInfoResult = await axios({
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
	} catch (err) {
		ctx.body = `request token failed ${err}`;
	}
});

export default router;
