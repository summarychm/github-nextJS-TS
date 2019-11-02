import { ReactElement } from "react";
import { NextPageContext, NextComponentType } from "next";
import dynamic from "next/dynamic";
import { request } from "$lib/request";
import { withRepoBasic } from "$components/with-repo-basic";
const MarkDownRenderer = dynamic(() => import("$components/MarkDownRenderer"));

const isServer = typeof window === "undefined";
interface iDetail {
	(props: any): ReactElement;
	getInitialProps?: (content: any) => any;
}
//详情页
let Detail: iDetail = function(props) {
	return <MarkDownRenderer content={props.readme.content} isBase64={true} />;
};
Detail.getInitialProps = async function(context: NextPageContext) {
	let readme = {};
	const { owner, name } = context.query;
	if (isServer && owner && name) {
		let result = await request({ url: `/repos/${owner}/${name}/readme` }, context.req);
		readme = result.data;
	}
	return { readme };
};
export default withRepoBasic(Detail, "readme");
