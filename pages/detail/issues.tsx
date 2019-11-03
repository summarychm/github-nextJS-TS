import { ReactElement, useState } from 'react';
import { NextPageContext } from 'next';
import { Spin } from 'antd';

import { withRepoBasic } from '$components/with-repo-basic';
import { request } from '$lib/request';
import { IssueItem } from './IssueItem';

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
    // 筛选条件
    const [label, setLabel] = useState([]);
    // return <div>111</div>;
    return (
        <div className="root">
            {/* search-bar */}
            {/* <div className="search">
    <SearchUser onChange={handleCreatorChange} value={creator} />
    <Select
      placeholder="状态"
      onChange={handleStateChange}
      style={{ width: 200, marginLeft: 20 }}
      value={state}
    >
      <Option value="all">all</Option>
      <Option value="open">open</Option>
      <Option value="closed">closed</Option>
    </Select>
    <Select
      mode="multiple"
      placeholder="Label"
      onChange={handleLabelChange}
      style={{ flexGrow: 1, marginLeft: 20, marginRight: 20 }}
      value={label}
    >
      {labels.map(la => (
        <Option value={la.name} key={la.id}>
          {la.name}
        </Option>
      ))}
    </Select>
    <Button type="primary" disabled={fetching} onClick={handleSearch}>
      搜索
    </Button>
  </div> */}
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
                .search {
                    display: flex;
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

    // TODO 使用cache缓存
    const issuesPromise = await request({ url: `/repos/${owner}/${name}/labels` }, context.req);
    console.log('============ fetchAry begin ====================');

    console.log(owner, name);
    console.log(issuesPromise);
    console.log('============ fetchAry end ======================');
    // const labelsPromise = request({ url: `/repos/${owner}/${name}/labels` }, context.req);
    // const fetchAry = await Promise.all([
    // 	await request({ url: `/repos/${owner}/${name}/issues` }, context.req),
    // 	await request({ url: `/repos/${owner}/${name}/labels` }, context.req),
    // ]);

    return {
        owner,
        name
        // initialIssues: fetchAry[0].data,
        // labels: fetchAry[1].data,
    };
};
export default withRepoBasic(Issues, 'issues');
