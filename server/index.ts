const Koa = require("koa");
const Router = require("koa-router");
const koa = new Koa(); // koa 实例
const router = new Router();
router.get("/a/:id", async (ctx) => {
	const id = ctx.params.id;
	console.log("/a:id", id);
	ctx.body = "hello:" + id;
});
koa.use(router.routes());
koa.listen(3000, () => {
	console.log("连接成功");
});

// const session = require("koa-session");
// const koaBody = require("koa-body");
// const Redis = require("ioredis");
// const next = require("next");

// const dev = process.env.NODE_ENV !== "production";
// // const redis = new Redis();
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();
// // const RedisSessionStore = require("./server/session-store");

// const startFn = async () => {
// 	await nextApp.prepare();
// 	console.log("startFN");

// 	// const sessionConfig = {
// 	// 	key: "sid",
// 	// 	// store: new RedisSessionStore(redis),
// 	// };
// 	// koa.use(session(sessionConfig, koa));

// };
// startFn();
