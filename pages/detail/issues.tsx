import { ReactElement, useState, useCallback } from 'react';
import { NextPageContext } from 'next';
import { Button, Spin, Select } from 'antd';

import { withRepoBasic } from '$components/with-repo-basic';
import { request } from '$lib/request';
import { IssueItem } from './IssueItem';
import { SearchBar } from './searchBar';

const isServer = typeof window === 'undefined';
const Option = Select.Option;
interface IDetail {
    getInitialProps?: (content: NextPageContext) => any;
    (props: any): ReactElement;
}
// Issues 详情
const Issues: IDetail = (props) => {
    const { initialIssues, labels, owner, name } = props;
    console.log('============ props begin ====================');
    console.log(Object.keys(props));
    console.log('============ props end ======================');
    const [issues, setIssues] = useState(initialIssues);
    const [fetching, setFetching] = useState(false); // 是否加载中
    // 筛选条件
    const [label, setLabel] = useState([]);
    const [state, setState] = useState();

    const handleLabelChange = useCallback((value) => setLabel(value), []);
    const handleStateChange = useCallback((value) => setState(value), []);

    const handleSearch = () => {};

    return (
        <div className="root">
            {/* search-bar */}
            <SearchBar labels={labels} />
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
    // https://api.github.com/repos/duxianwei520/react/issues
    // https://api.github.com/repos/duxianwei520/react/labels
    // TODO 使用cache缓存
    const { owner, name } = context.query;
    const urlBase = `/repos/${owner}/${name}`;
    const issuesPromise = request({ url: `${urlBase}/issues` }, context.req);
    const labelsPromise = request({ url: `${urlBase}/labels` }, context.req, false);
    const fetchAry = await Promise.all([await issuesPromise, await labelsPromise]);

    // console.log('============ fetchAry begin ====================');
    // console.log(owner, name);
    // console.log(fetchAry);
    // console.log('============ fetchAry end ======================');
    return {
        owner,
        name,
        initialIssues: fetchAry[0].data,
        labels: fetchAry[1].data
    };
};
export default withRepoBasic(Issues, 'issues');
