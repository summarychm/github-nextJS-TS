const path = require("path");
const webpack = require("webpack");
const withCss = require("@zeit/next-css");
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

const configUrls = require("./configUrls");
const githubUrls = configUrls.github;
let str = `${githubUrls.oauth_base_url}?client_id=${githubUrls.client_id}&scope=${githubUrls.scope}`;

const configs = {
	compress: false,
	distDir: "dest-front",
	// generateEtags: true,// 是否给每个路由生成Etag

	// 页面内容缓存配置(内存)
	// onDemandEntries: {
	//   maxInactiveAge: 25 * 1000,//缓存的时长（ms）
	//   pagesBufferLength: 2,//同时缓存个数
	// },
	// 在pages目录下哪种后缀的文件会被认为是页面
	// pageExtensions: ['ts',"tsx", 'jsx', 'js'],

	// 配置buildId
	// generateBuildId: async () => { 
	//   if (process.env.YOUR_BUILD_ID)
	//     return process.env.YOUR_BUILD_ID
	//   return null // 返回null使用默认的unique id
	// },

	// 手动修改webpack config
	webpack(config, options) {
		const port = process.env.PORT;
		config.resolve.alias["$components"] = path.join(__dirname, "components");
		config.resolve.alias["$lib"] = path.join(__dirname, "lib");
		config.resolve.alias["$interface"] = path.join(__dirname, "./interface/index.ts");
		config.resolve.alias["@"] = path.join(__dirname, "./");
		// moment.js 只加载 locale zh-cn文件
		config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/));
		// auto open in default browser
		port && config.plugins.push(new OpenBrowserPlugin({
			delay: 2000,
			url: `http://localhost:${port}`
		}));

		return config;
	},

	analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
	bundleAnalyzerConfig: {
		server: {
			analyzerMode: 'static',
			reportFilename: '../bundles/server.html',
		},
		browser: {
			analyzerMode: 'static',
			reportFilename: '../bundles/client.html',
		},
	},

	// 修改webpackDevMiddleware配置
	// webpackDevMiddleware: config => {
	//   return config
	// },

	// 在组件中通过process.env.xxx获取对应的值
	env: {customKey: "value"},

	// 下面两个要通过 'next/config' 来读取,只有在服务端渲染时才会获取的配置
	// serverRuntimeConfig: {
	//   mySecret: 'secret',
	//   secondSecret: process.env.SECOND_SECRET,
	// },

	// 在服务端渲染和客户端渲染都可获取的配置
	publicRuntimeConfig: {
		per_count: 20, // 每页条数
		OAUTH_BASE_URL: githubUrls.oauth_base_url,
		OAUTH_URL: `${githubUrls.oauth_base_url}?client_id=${githubUrls.client_id}&scope=${githubUrls.scope}`,
	},
};

if (typeof require !== "undefined") require.extensions[".css"] = (file) => {};

// 合并nextJS配置
module.exports = withBundleAnalyzer(withCss(configs));
