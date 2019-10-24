const Redis = require("ioredis");
const next = require("next");
const Koa = require("koa");
const Router = require("koa-router");
const session = require("koa-session");
const koaBody = require("koa-body");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);

const redis = new Redis();
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler(); //将next作为中间件
const RedisSessionStore = require("./session-store");

import "./routerEvents"; //注册路由钩子log

// 等待next编译完成
nextApp.prepare().then(() => {
	const koa = new Koa(); // koa 实例
	const router = new Router();

	const sessionConfig = {
		key: "sid",
		store: new RedisSessionStore(redis),
	};
	koa.keys = ["next.js koa ts redis"];
	koa.use(session(sessionConfig, koa));
	koa.use(koaBody()); //

	router.get("/a/:id", async (ctx) => {
		const id = ctx.params.id;
		console.log("/a:id", id);
		await nextHandle(ctx.req, ctx.res, {
			//交由next.js路由处理
			pathname: "/a",
			query: { id }, //next.js动态路由只能通过query
		});
		ctx.respond = false; //自行处理ctx.body
	});

	koa.use(router.routes());

	//对于未捕获的路由全部交由next.js处理
	koa.use(async (ctx) => {
		// 将node原生的res,req对象出入到next.js中
		await nextHandle(ctx.req, ctx.res);
		ctx.respond = false;
	});
	// koa.use(async (ctx, next) => {
	// 	ctx.req.session = ctx.session;
	// 	await nextHandle(ctx.req, ctx.res);
	// 	ctx.respond = false;
	// });

	koa.listen(port, () => {
		console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
	});
});
