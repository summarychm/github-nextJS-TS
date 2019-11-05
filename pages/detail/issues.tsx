import { ReactElement, useState, useCallback } from 'react';
import { NextPageContext } from 'next';
import { Spin } from 'antd';

import { withRepoBasic } from '$components/with-repo-basic';
import { request } from '$lib/request';
import cache from '$lib/cache';
import IssueItem from './IssueItem';
import SearchBar from './searchBar';

const isServer = typeof window === 'undefined';

interface IDetail {
    getInitialProps?: (content: NextPageContext) => any;
    (props: any): ReactElement;
}
// Issues 详情
const Issues: IDetail = (props) => {
    const { initialIssues, labels, owner, name } = props;

    const [issues, setIssues] = useState(initialIssues);
    const [fetching, setFetching] = useState(false); // 是否加载中
    // const [fetchIssues, setFetchIssues] = useState(false); // 列表是否加载中
    const handleSetFetch = (value: boolean) => setFetching(value);
    const handleSetIssues = (value) => setIssues(value);
    return (
        <div className="root">
            {/* search-bar */}
            <SearchBar
                labels={labels}
                fetching={fetching}
                onSetFetch={handleSetFetch}
                onSetIssues={handleSetIssues}
                owner={owner}
                name={name}
            />
            {/* Issues */}
            {fetching ? (
                <div className="loading">
                    <Spin />
                </div>
            ) : (
                <div className="issues">
                    {issues.map((issue) => (
                        <IssueItem issue={issue} key={issue.id} />
                    ))}
                </div>
            )}
            <style jsx>{`
                .issues {
                    border: 1px solid #eee;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    margin-top: 20px;
                }
                .loading {
                    height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </div>
    );
};

Issues.getInitialProps = async (context) => {
    const { owner, name } = context.query;
    const urlBase = `/repos/${owner}/${name}`;
    const labelsKey = `${urlBase}/labels`;
    const issuesKey = `${urlBase}/issues`;

    let labelsPromise = null;
    let issuesPromise = null;
    if (cache.getCache(labelsKey)) {
        console.log('labelskey读取缓存');
        labelsPromise = Promise.resolve({ data: cache.getCache(labelsKey) });
    } else {
        labelsPromise = request({ url: `https://api.github.com${urlBase}/labels` }, context.req);
    }
    if (cache.getCache(issuesKey)) {
        console.log('issuesKey读取缓存');
        issuesPromise = Promise.resolve({ data: cache.getCache(issuesKey) });
    } else {
        issuesPromise = request({ url: `${urlBase}/issues` }, context.req);
    }

    // labels如果传递了Authorization字段就会报错,所以采用直连的方式

    const fetchAry = await Promise.all([await issuesPromise, await labelsPromise]);

    if (!cache.getCache(labelsKey)) cache.setCache(labelsKey, fetchAry[1].data, 1000 * 60 * 30);
    if (!cache.getCache(issuesKey)) cache.setCache(issuesKey, fetchAry[0].data, 1000 * 60 * 10);
    return {
        owner,
        name,
        initialIssues: cache.getCache(issuesKey),
        labels: cache.getCache(labelsKey)
    };
};
export default withRepoBasic(Issues, 'issues');
