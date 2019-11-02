import { ReactElement } from "react";
import { NextPageContext, NextComponentType } from "next";

import { request } from "$lib/request";
import MarkDownRenderer from "$components/MarkDownRenderer";
import withRepoBasic from "$components/with-repo-basic";

const isServer = typeof window === "undefined";
interface iDetail {
	(props: any): ReactElement;
	getInitialProps?: (content: any) => any;
}
//详情页
let Detail: iDetail = function(props) {
	const { readme } = props;
	// console.log("============ props begin ====================");
	// console.log(isServer);
	// console.log("============ props end ======================");
	// return <></>;
	return <MarkDownRenderer content={readme.content} isBase64={true} />;
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
