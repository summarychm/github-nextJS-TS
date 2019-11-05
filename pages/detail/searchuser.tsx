import { useState, useRef } from 'react';
import { Spin, Select } from 'antd';

import { request } from '$lib/request';
import { useDebounceCallback } from '$lib/useDebounceCallback';

const Option = Select.Option;
export default function SearchUser({ value, onChange, fetching, onSetFetch }) {
    const [options, setOptions] = useState([]);
    const fetchUser = useDebounceCallback((value) => {
        value = value.trim();
        if (!value) return;
        onSetFetch(true);
        console.log('fetching user', value);
        request({
            url: `/search/users?q=${value.trim()}`
        })
            .then((res) => {
                console.log('user', res);
                return res.data.items.map((user) => ({
                    text: user.login,
                    value: user.login,
                    avatar: user.avatar_url
                }));
            })
            .then((data) => {
                onSetFetch(false);
                setOptions(data);
            });
    }, 500);
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
                    <span>
                        <img
                            style={{ width: '50px', marginRight: '5px' }}
                            src={op.avatar}
                            alt={op.text}
                        />
                        {op.text}
                    </span>
                </Option>
            ))}
        </Select>
    );
}
