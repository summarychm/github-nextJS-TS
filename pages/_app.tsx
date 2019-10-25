import App from "next/app";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import "../public/style/global.css";

import Layout from "$components/Layout";

export default class MyApp extends App {
	// 每次路由变化都会触发该方法
	static async getInitialProps(ctx) {
		const { Component } = ctx; // Component:当前要渲染的页面组件
		let pageProps = {};
		//调用要渲染组件的getInitialProps
		if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
		return { pageProps };
	}
	render() {
		//, reduxStore
		const { Component, pageProps } = this.props;
		return (
			// <Provider store={reduxStore}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			// </Provider>
		);
	}
}
