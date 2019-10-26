import React, { ReactElement } from "react";
import { Store } from "redux";
import createRootStore from "../store";

const isServer = !process.browser;
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__"; // Symbol("__NEXT_REDUX_STORE__");

interface iWithReduxStore {
	(WrappedComponent: ReactElement): ReactElement;
}

// 获取/创建store实例(Server&Client端通用)
function getOrCreateStore(initialState?): Store {
	// Server端直每次创建新的store,否则会request间共享store
	if (isServer) {
		console.log("Server端运行!");
		return createRootStore(initialState);
	}
	// Client端使用全局变量缓存
	else {
		console.log("client端运行!");
		let localReduxStore = window[__NEXT_REDUX_STORE__];
		if (!localReduxStore) localReduxStore = createRootStore(initialState);
		return localReduxStore;
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
			let initialValue = {};
			const reduxStore = getOrCreateStore(initialValue); // 获取最新的store
			appContext.ctx.reduxStore = reduxStore;
			let appProps = {};
			if (typeof WrappedComponent.getInitialProps === "function") {
				appProps = await WrappedComponent.getInitialProps(appContext);
			}
			return {
				...appProps,
				initialReduxState: reduxStore.getState(),
			};
		}
		reduxStore: Store; //声明属性类型
		constructor(props) {
			super(props);
			// 根据state创建store对象
			this.reduxStore = getOrCreateStore(props.initialReduxState);
		}
		render() {
			// 透传props,加料reduxStore
			return <WrappedComponent {...this.props} reduxStore={this.reduxStore} />;
		}
	};
};
export default withReduxStore;
