import App from "next/app";
import { Store } from "redux";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import "../public/style/global.css";

import Layout from "../layouts";
import withReduxStore from "../lib/with-redux-store";
import PageLoading from "$components/PageLoading";
import { Router } from "next/router";

interface iProps {
	Component: React.ReactElement;
	pageProps: any;
	reduxStore: Store;
}
class MyApp extends App<iProps> {
	// 每次路由变化都会触发该方法
	static async getInitialProps(ctx) {
		const { Component } = ctx; // Component:当前要渲染的页面组件
		let pageProps = {};
		//调用要渲染组件的 getInitialProps
		if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
		return { pageProps };
	}
	state = { loading: false };
	startLoading = () => this.setState({ loading: true });
	stopLoading = () => this.setState({ loading: false });
	componentDidMount() {
		Router.events.on("routeChangeStart", this.startLoading);
		Router.events.on("routeChangeComplete", this.stopLoading);
		Router.events.on("routeChangeError", this.stopLoading);
	}
	componentWillUnmount() {
		Router.events.off("routeChangeStart", this.startLoading);
		Router.events.off("routeChangeComplete", this.stopLoading);
		Router.events.off("routeChangeError", this.stopLoading);
	}
	render() {
		const { Component, pageProps, reduxStore } = this.props;
		return (
			<Provider store={reduxStore}>
				{this.state.loading ? <PageLoading /> : null}
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		);
	}
}
export default withReduxStore(MyApp);
