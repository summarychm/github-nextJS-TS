import { Button, Select, message } from 'antd';
import { useState, useCallback } from 'react';

import { SearchUser } from './searchuser';
import { request } from '$lib/request';
const Option = Select.Option;

export function SearchBar({ labels, fetching, onSetFetch, onSetIssues, owner, name }) {
    const [creator, setCreator] = useState();
    const [state, setIssuesState] = useState();
    const [label, setLabelState] = useState([]);

    const handleCreatorChange = useCallback((value) => setCreator(value), []);
    const handleStateChange = useCallback((value) => setIssuesState(value), []);
    const handleLabelChange = useCallback((value) => setLabelState(value), []);
    const handleSearch = () => {
        onSetFetch(true);
        request({ url: getQuery() })
            .then((res) => {
                onSetFetch(false);
                let data = res.data;
                console.log('============ data begin ====================');
                console.log(data);
                console.log('============ data end ======================');
                onSetIssues(data);
            })
            .catch((err) => {
                console.error('serarchErr:', err);
                message.error('搜索失败,稍后重试!');
            });
    };
    function getQuery() {
        let queryUrl = `/repos/${owner}/${name}/issues?`;
        queryUrl += creator ? `&creator=${creator}` : ``;
        queryUrl += state ? `&state=${state}` : ``;
        queryUrl += label.length ? `&labels=${label.join(',')}` : '';
        return queryUrl;
    }
    return (
        <div className="search">
            <SearchUser
                onChange={handleCreatorChange}
                value={creator}
                fetching={fetching}
                onSetFetch={onSetFetch}
            />
            <Select
                placeholder="状态"
                onChange={handleStateChange}
                style={{ width: 200, marginLeft: 20 }}
                value={state}
            >
                <Option value="all">All</Option>
                <Option value="open">Open</Option>
                <Option value="closed">Closed</Option>
            </Select>
            <Select
                mode="multiple"
                placeholder="Label"
                onChange={handleLabelChange}
                style={{ flexGrow: 1, marginLeft: 20, marginRight: 20 }}
                value={label}
            >
                {labels.map((item) => (
                    <Option value={item.name} key={item.id}>
                        {item.name}
                    </Option>
                ))}
            </Select>
            <Button type="primary" disabled={fetching} onClick={handleSearch}>
                搜索
            </Button>
            <style jsx>{`
                .search {
                    display: flex;
                }
            `}</style>
        </div>
    );
}
