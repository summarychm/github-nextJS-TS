import { Row, Col, Pagination, List } from 'antd';
import { NextRouter, useRouter } from 'next/router';
import getConfig from 'next/config';

import { INextFC } from '$interface';
import { request } from '$lib/request';
import { noop } from '$lib/utils';
import { getQueryString } from '$lib/getQueryString';

import FilterLink from './FilterLink';
import { Repo } from '$components/repo';

const selectedItemStyle = {
    borderLeft: '2px solid #e36209',
    fontWeight: 100
};
const { publicRuntimeConfig } = getConfig();
const per_page = publicRuntimeConfig.per_count;

interface IProps {
    router: NextRouter;
    repos: any;
}

const Search: INextFC<IProps> = function({ repos }) {
    const router: NextRouter = useRouter();
    const { ...querys } = router.query;
    const { lang, sort, order, page } = router.query;
    return (
        <>
            <Row gutter={20}>
                {/* left - searchOptions */}
                <Col span={6}>
                    <LanguageSoft lang={lang} querys={querys} />
                    <MatchSoft sort={sort} order={order} querys={querys} />
                </Col>
                {/* right- searchList */}
                <Col span={18}>
                    <h3 className="repos-title">{repos.total_count} 个仓库</h3>
                    {repos.items.map((repo) => (
                        <Repo repo={repo} key={repo.id} />
                    ))}
                    <div className="pagination">
                        <Pagination
                            pageSize={per_page}
                            current={Number(page) || 1}
                            total={1000}
                            onChange={noop}
                            itemRender={(page, type, ol) => {
                                const p =
                                    type === 'page' ? page : type === 'prev' ? page - 1 : page + 1;
                                const name = type === 'page' ? String(String(page)) : ol;
                                return <FilterLink {...querys} page={p} name={name} />;
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <style jsx>{`
                .root {
                    padding: 20px 0;
                    margin: 0 auto;
                    flex-direction: column;
                }
                .list-header {
                    font-weight: 800;
                    font-size: 16px;
                }
                .repos-title {
                    border-bottom: 1px solid #eee;
                    font-size: 24px;
                    line-height: 50px;
                }
                .pagination {
                    padding: 20px;
                    text-align: center;
                }
            `}</style>
        </>
    );
};
Search.getInitialProps = async ({ ctx }) => {
    const { query } = ctx.query;
    if (!query) return { repos: { total_count: 0 } };

    let queryString = getQueryString(ctx.query);
    // 针对github接口单独处理
    queryString = queryString.replace(/&lang=/, '+language:').replace('query=', 'q=');
    const result = await request({ url: `/search/repositories${queryString}` }, ctx.req);
    return { repos: result.data };
};

const LanguageSoft = ({ lang, querys }) => {
    const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust'];
    return (
        <List
            bordered
            header={<span className="list-header">所用语言</span>}
            style={{ marginBottom: 20 }}
            dataSource={LANGUAGES}
            renderItem={(item) => {
                const selected = lang === item;
                return (
                    <List.Item style={selected ? selectedItemStyle : null}>
                        {selected ? (
                            <span>{item}</span>
                        ) : (
                            <FilterLink {...querys} lang={item} name={item} />
                        )}
                    </List.Item>
                );
            }}
        />
    );
};

const MatchSoft = ({ sort, order, querys }) => {
    const SORT_TYPES = [
        {
            name: 'Best Match'
        },
        {
            name: 'Most Stars',
            value: 'stars',
            order: 'desc'
        },
        {
            name: 'Fewest Stars',
            value: 'stars',
            order: 'asc'
        },
        {
            name: 'Most Forks',
            value: 'forks',
            order: 'desc'
        },
        {
            name: 'Fewest Forks',
            value: 'forks',
            order: 'asc'
        }
    ];
    return (
        <List
            bordered
            header={<span className="list-header">排序</span>}
            dataSource={SORT_TYPES}
            renderItem={(item) => {
                let selected = false;
                if (item.name === 'Best Match' && !sort) {
                    selected = true;
                } else if (item.value === sort && item.order === order) {
                    selected = true;
                }
                return (
                    <List.Item style={selected ? selectedItemStyle : null}>
                        {selected ? (
                            <span>{item.name}</span>
                        ) : (
                            <FilterLink
                                {...querys}
                                sort={item.value}
                                order={item.order}
                                name={item.name}
                            />
                        )}
                    </List.Item>
                );
            }}
        />
    );
};
export default Search;
