import { useState, useCallback, useRef } from 'react';
import { Spin, Select } from 'antd';
import { request } from '$lib/request';

const Option = Select.Option;
export function SearchUser({ value, onChange, fetching, onSetFetch }) {
    const [options, setOptions] = useState([]);

    const fetchUser = useCallback((value) => {
        value = value.trim();
        if (!value) return;
        onSetFetch(true);
        console.log('fetching user', value);
        // TODO 加入debounce
        // TODO 改为读取Issuess涉及的用户
        // TODO 将用户列表添加用户头像显示

        request({
            url: `/search/users?q=${value.trim()}`
        })
            .then((res) => {
                console.log('user', res);
                return res.data.items.map((user) => ({
                    text: user.login,
                    value: user.login
                }));
            })
            .then((data) => {
                onSetFetch(false);
                setOptions(data);
            });
    }, []);

    const handleChange = (value) => {
        setOptions([]);
        onSetFetch(false);
        onChange(value);
    };
    return (
        <Select
            style={{ width: 200 }}
            showSearch={true}
            notFoundContent={fetching ? <Spin size="small" /> : <span>nothing</span>}
            filterOption={false}
            placeholder="创建者"
            value={value}
            onChange={handleChange}
            onSearch={fetchUser}
            allowClear={true}
        >
            {options.map((op) => (
                <Option value={op.value} key={op.value}>
                    {op.text}
                </Option>
            ))}
        </Select>
    );
}
