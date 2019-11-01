import App from "next/app";
import { Router } from "next/router";
import { Store } from "redux";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import "../public/style/global.css";

import Layout from "../layouts";
import { withReduxStore } from "$lib/with-redux-store";
import { withLoading } from "$components/with-loading";

interface iProps {
	Component: React.ReactElement;
	pageProps: any;
	reduxStore: Store;
}
class MyApp extends App<iProps> {
	// SSR/ RouterChange
	static async getInitialProps(ctx) {
		const { Component } = ctx;
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
export default withReduxStore(withLoading(MyApp));
