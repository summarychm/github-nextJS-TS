import { NextPageContext, NextComponentType } from "next";
import { Router } from "next/router";
import Link from "next/link";
import { withRouter } from "next/router";

import { request } from "$lib/request";

import Repo from "$components/repo";
import { DetailTabs } from "$components/DetailTabs";

interface iContext {
	router: Router;
	ctx: NextPageContext;
}
interface iProps {
	repoBasic: any;
	router: Router;
	[prop: string]: any;
}
export default function(Wrapped: NextComponentType, type: string) {
	function WithRepoBasic(props: iProps) {
		const { repoBasic, router, ...rest } = props;
		let tabType = type;
		return (
			<div className="root">
				<div className="repo-basic">
					<Repo repo={repoBasic} />
					<DetailTabs type={tabType} queryObj={router.query} />
				</div>
				<div>
					<Wrapped {...rest} />
				</div>
				<style jsx>{`
					.root {
						padding-top: 20px;
					}
					.repo-basic {
						padding: 20px;
						border: 1px solid #eee;
						margin-bottom: 20px;
						border-radius: 5px;
					}
				`}</style>
			</div>
		);
	}
	WithRepoBasic.getInitialProps = async (context: iContext) => {
		const { router, ctx } = context;
		const { owner, name } = ctx.query;
		let pageData = {};
		if (Wrapped.getInitialProps) pageData = await Wrapped.getInitialProps(ctx);

		// TODO: 加入缓存机制
		const result = await request({ url: `/repos/${owner}/${name}` }, ctx.req);
		// console.log("============ result begin ====================");
		// console.log(result);
		// console.log("============ result end ======================");

		return {
			repoBasic: result.data,
			...pageData,
		};
	};
	return withRouter(WithRepoBasic);
}
