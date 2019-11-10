import dynamic from 'next/dynamic';

import { INextFC } from '$interface';
import { request } from '$lib/request';
import { withRepoBasic } from '$components/with-repo-basic';

interface IDetail {
    readme: {
        content: string;
        encoding: string;
    };
}
// 动态加载
const MarkDownRenderer = dynamic(() => import('$components/MarkDownRenderer'));

const Detail: INextFC<IDetail> = function(props) {
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
