import React, { useState, useEffect, ReactElement } from "react";
import { Spin } from "antd";
import { Router } from "next/router";

interface iWithDetail {
	(props: object): ReactElement;
	getInitialProps?: (context: any) => object; //next.js
}
const styleSpin: any = { position: "absolute", width: "100%", height: "100%", padding: "20%", textAlign: "center", zIndex: 10001, backgroundColor: "rgb(0,0,0,.3)" };

/**
 * 全局Loading组件(HOC)
 * @param WarperComponent 要支持全局loading的React组件
 */
export const withLoading = (WarperComponent) => {
	let WithDetail: iWithDetail = function(props) {
		let [isLoading, changeLoading] = useState(false);
		useEffect(() => {
			Router.events.on("routeChangeStart", () => changeLoading(true));
			Router.events.on("routeChangeComplete", () => changeLoading(false));
			Router.events.on("routeChangeError", () => changeLoading(false));
			return () => {
				Router.events.off("routeChangeStart", () => changeLoading(true));
				Router.events.off("routeChangeComplete", () => changeLoading(false));
				Router.events.off("routeChangeError", () => changeLoading(false));
			};
		});
		return (
			<>
				{isLoading && <Spin style={styleSpin} size="large" />}
				<WarperComponent {...props} />
			</>
		);
	};
	WithDetail.getInitialProps! = async (context) => {
		let pageData = {};
		if (WarperComponent.getInitialProps) pageData = await WarperComponent.getInitialProps(context);
		return { ...pageData };
	};
	return WithDetail;
};
