import App from "next/app";
import { Store } from "redux";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import "../public/style/global.css";

import Layout from "../layouts";
import withReduxStore from "../lib/with-redux-store";

interface iProps {
	Component: React.ReactElement;
	pageProps: any;
	reduxStore: Store;
}
class MyApp extends App<iProps> {
	state = {
		context: "test Value",
		loading: false,
	};
	// 每次路由变化都会触发该方法
	static async getInitialProps(ctx) {
		console.log('============ "页面初始化" begin ====================');
		console.log(" _app 页面初始化");
		console.log('============ "页面初始化" end ======================');
		const { Component } = ctx; // Component:当前要渲染的页面组件
		let pageProps = {};
		//调用要渲染组件的 getInitialProps
		if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
		return { pageProps };
	}
	render() {
		const { Component, pageProps, reduxStore } = this.props;
		return (
			<Provider store={reduxStore}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		);
	}
}
export default withReduxStore(MyApp);
