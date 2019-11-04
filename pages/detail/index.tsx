import { ReactElement } from 'react';
import { NextPageContext, NextComponentType } from 'next';
import dynamic from 'next/dynamic';

import { request } from '$lib/request';
import { withRepoBasic } from '$components/with-repo-basic';
import cache from '$lib/cache';
interface IDetail {
    getInitialProps?: (content: NextPageContext) => any;
    (props: any): ReactElement;
}
// 动态加载
const MarkDownRenderer = dynamic(() => import('$components/MarkDownRenderer'));

let Detail: IDetail = function(props) {
    // console.log('============ "Detail render" begin ====================');
    // console.log(cache.getAll());
    // console.log('============ "Detail render" end ======================');
    const { content, encoding } = props.readme;
    return <MarkDownRenderer content={content} isBase64={encoding === 'base64'} />;
};
Detail.getInitialProps = async function(context) {
    const { owner, name } = context.query;
    // readme content
    let result = await request({ url: `/repos/${owner}/${name}/readme` }, context.req);
    // console.log('============ result begin ====================');
    // console.log(result.data);
    // console.log('============ result end ======================');
    return { readme: result.data || {} };
};
export default withRepoBasic(Detail, 'readme');
