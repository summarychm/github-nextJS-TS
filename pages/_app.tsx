import App from "next/app";

export default class MyApp extends App {
	// 需继承App,每次路由变化都会触发该方法
	static async getInitialProps(ctx) {
		const { Component } = ctx; // Component:当前要渲染的页面组件
		let pageProps = {};
		//调用要渲染组件的getInitialProps
		if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
		return { pageProps };
	}
	render() {
		const { Component, pageProps } = this.props;
		return <Component {...pageProps} />;
	}
}
