import { ReactElement } from 'react';
import { NextPageContext, NextComponentType } from 'next';
import dynamic from 'next/dynamic';

import { request } from '$lib/request';
import { withRepoBasic } from '$components/with-repo-basic';

interface IDetail {
    getInitialProps?: (content: NextPageContext) => any;
    (props: any): ReactElement;
}
// 动态加载
const MarkDownRenderer = dynamic(() => import('$components/MarkDownRenderer'));

let Detail: IDetail = function(props) {
    const { content, encoding } = props.readme;
    return <MarkDownRenderer content={content} isBase64={encoding === 'base64'} />;
};
Detail.getInitialProps = async function(context) {
    const { owner, name } = context.query;
    // readme content
    let result = await request({ url: `/repos/${owner}/${name}/readme` }, context.req);
    return { readme: result.data || {} };
};
export default withRepoBasic(Detail, 'readme');
