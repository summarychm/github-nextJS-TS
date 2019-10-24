const Koa = require("koa");
const Router = require("koa-router");
const session = require("koa-session");
const koaBody = require("koa-body");
const Redis = require("ioredis");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);

const redis = new Redis();
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
// const RedisSessionStore = require("./server/session-store");

nextApp.prepare().then(() => {
	console.log("startFN");
	const koa = new Koa(); // koa 实例
	const router = new Router();

	// const sessionConfig = {
	// 	key: "sid",
	// 	// store: new RedisSessionStore(redis),
	// };
	// koa.use(session(sessionConfig, koa));

	router.get("/a/:id", async (ctx) => {
		const id = ctx.params.id;
		console.log("/a:id", id);
		ctx.body = "hello:" + id;
	});

	koa.use(router.routes());
	koa.listen(port, () => {
		console.log(`> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`);
	});
});
