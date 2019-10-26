const Redis = require("ioredis");
const next = require("next");
// const Koa = require("koa");
import Koa, { Context } from "koa";
const session = require("koa-session");
const koaBody = require("koa-body");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);

const redis = new Redis();
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler(); //将next作为中间件
const RedisSessionStore = require("./session-store");
import routers from "./routers";

import "./routerEvents"; //注册路由钩子log

// 等待next编译完成
nextApp.prepare().then(() => {
	const koa = new Koa(); // koa 实例
	koa.keys = ["next.js koa ts redis"];

	const sessionConfig = {
		key: "sid",
		store: new RedisSessionStore(redis),
	};

	// middleware
	koa.use(koaBody()); //body解析
	koa.use(session(sessionConfig, koa));
	koa.use(routers.routes());

	//对于未捕获的路由全部交由next.js处理
	koa.use(async (ctx: Context) => {
		ctx.req["session"] = ctx.session;

		// 将node原生的res,req传入next.js中
		await nextHandle(ctx.req, ctx.res);
		ctx.respond = false;
	});

	koa.listen(port, () => {
		console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
	});
});
