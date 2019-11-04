import { NextPageContext, NextComponentType } from 'next';
import { Router } from 'next/router';
import Link from 'next/link';
import { withRouter } from 'next/router';

import { Repo } from '$components/repo';
import { DetailTabs } from '$components/DetailTabs';
import { request } from '$lib/request';
import cache from '$lib/cache';

interface iContext {
    router: Router;
    ctx: NextPageContext;
}
interface IProps {
    repoBasic: any;
    router: Router;
    [prop: string]: any;
}
/**
 * 使用hoc实现readme/issues条件渲染
 * @param Wrapped DetailComponent
 * @param type "readme"/"issues"
 */
export function withRepoBasic(Wrapped: NextComponentType, type: string) {
    function WithRepoBasic(props: IProps) {
        const { repoBasic, router, ...rest } = props;
        // FIXME 这里同时render了两次
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
                        padding: 20px 0;
                        max-width: 1200px;
                        margin: 0 auto;
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
        let pageData: any = {},
            result: any = {};
        if (Wrapped.getInitialProps) pageData = await Wrapped.getInitialProps(ctx);

        // TODO: 加入缓存机制
        const url = `/repos/${owner}/${name}`,
            cacheKey = `${url}/result`;
        if (cache.getCache(cacheKey)) result = cache.getCache(cacheKey);
        else {
            result = await request({ url }, ctx.req);
            result = result.data || {};
            cache.setCache(cacheKey, result, 1000 * 60 * 10);
        }
        return {
            repoBasic: result,
            ...pageData
        };
    };
    return withRouter(WithRepoBasic);
}
