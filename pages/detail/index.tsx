import { ReactElement } from 'react';
import { NextPageContext, NextComponentType } from 'next';
import dynamic from 'next/dynamic';
import { request } from '$lib/request';
import { withRepoBasic } from '$components/with-repo-basic';
interface IDetail {
    getInitialProps?: (content: NextPageContext) => any;
    (props: any): ReactElement;
}

const MarkDownRenderer = dynamic(() => import('$components/MarkDownRenderer'));

const isServer = typeof window === 'undefined';

// 详情页
let Detail: IDetail = function(props) {
    return <MarkDownRenderer content={props.readme.content} isBase64={true} />;
};
Detail.getInitialProps = async function(context) {
    let readme = {};
    const { owner, name } = context.query;
    if (isServer && owner && name) {
        let result = await request({ url: `/repos/${owner}/${name}/readme` }, context.req);
        readme = result.data;
    }
    return { readme };
};
export default withRepoBasic(Detail, 'readme');
