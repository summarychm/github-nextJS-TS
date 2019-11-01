import React, { useState, useEffect, ReactElement } from "react";
import { Spin } from "antd";
import { Router } from "next/router";

interface iWithDetail {
	(props: object): ReactElement;
	getInitialProps?: (context: any) => object; //next.js
}
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
			<div className="root">
				{isLoading ? <Spin /> : <WarperComponent {...props} />}
				<style jsx>{`
					.root {
						position: fixed;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						background: rgba(255, 255, 255, 0.3);
						z-index: 10001;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				`}</style>
			</div>
		);
	};
	WithDetail.getInitialProps! = async (context) => {
		let pageData = {};
		if (WarperComponent.getInitialProps) pageData = await WarperComponent.getInitialProps(context);
		return { ...pageData };
	};
	return WithDetail;
};
