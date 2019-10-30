import React from "react";
import { Store } from "redux";

import createRootStore from "../store";

const isServer = !process.browser;
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

// 获取/创建store实例(Server&Client端通用)
function getOrCreateStore(initialState?): Store {
	// Server端直每次创建新的store,否则会request间共享store
	if (isServer) {
		console.log("Server端运行!");
		return createRootStore(initialState);
	}
	// Client端共用同一store并使用全局变量缓存
	else {
		console.log("client端运行!");
		if (!window[__NEXT_REDUX_STORE__]) window[__NEXT_REDUX_STORE__] = createRootStore(initialState);
		return window[__NEXT_REDUX_STORE__];
	}
}

interface iProps {
	initialReduxState: Object;
}
// 为next.js组件增加redux功能
const withReduxStore = (WrappedComponent) => {
	return class WithComponent extends React.Component<iProps> {
		static async getInitialProps(appContext) {
			// 设置server端redux的初始值,如token信息
			let initialValue = {},
				appProps = {};
			if (isServer) {
				const session = appContext.ctx.req.session; //读取用户信息写入redux
				if (session) initialValue = { user: session.userInfo };
			}

			const store = getOrCreateStore(initialValue); // 创建/获取store
			appContext.reduxStore = store; //挂载到ctx

			// 调用子组件的 getInitialProps 获取初始化所需的pops
			if (typeof WrappedComponent.getInitialProps === "function") {
				appProps = await WrappedComponent.getInitialProps(appContext);
			}
			var obj = {
				...appProps,
				initialReduxState: store.getState(),
			};
			return obj;
		}
		reduxStore: Store; //缓存store对象
		constructor(props) {
			super(props);
			// Client: 根据props.state创建store对象
			this.reduxStore = getOrCreateStore(props.initialReduxState);
		}
		render() {
			// 透传props,加料reduxStore
			return <WrappedComponent {...this.props} reduxStore={this.reduxStore} />;
		}
	};
};
export default withReduxStore;
