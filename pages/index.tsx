import React, { useEffect } from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Button, Icon } from 'antd';
import { NextPageContext, NextPage } from 'next';
import getConfig from 'next/config';
import { useRouter, NextRouter } from 'next/router';

import { INextFC } from '$interface';
import { request } from '$lib/request';
import cache from '$lib/cache';
import { Repo } from '$components/repo';

interface IProps {
    user?: {
        [param: string]: any;
    };
    userRepos: any[];
    userStartRepos: any[];
    isLogin: boolean;
    // dispatch?: Dispatch;
}

// 用于缓存Repos & Starts的key
const userReposKey = 'index-UserRepos';
const userStartKey = 'index-UserStartRepos';
const isServer = typeof window === 'undefined';
const { publicRuntimeConfig } = getConfig();

const Index: INextFC<IProps> = ({ user, userRepos, userStartRepos }) => {
    const router = useRouter();
    const tabKey = (router.query.tabs as string) || 'stars';

    useEffect(() => {
        if (!isServer) {
            // 更新repos缓存
            cache.setCache(userReposKey, userRepos);
            cache.setCache(userStartKey, userStartRepos);
        }
    }, [userRepos, userStartRepos]);

    const handleTabChange = (activeKey) => {
        console.log(activeKey);
        router.push(`/?tabs=${activeKey}`);
    };

    if (!user || !user.id) {
        return (
            <div className="root">
                <p>亲，您还没有登录哦~</p>
                <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
                    点击登录
                </Button>
                <style jsx>{`
                    .root {
                        height: 400px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="root">
            <div className="user-info">
                <img src={user.avatar_url} alt="user avatar" className="avatar" />
                <span className="login">{user.login}</span>
                <span className="name">{user.name}</span>
                <span className="bio">{user.bio}</span>
                <p className="email">
                    <Icon type="mail" style={{ marginRight: 10 }} />
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
            </div>
            <Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
                <Tabs.TabPane tab="你的仓库" key="repositories">
                    {userRepos.map((repo) => (
                        <Repo key={repo.id} repo={repo} />
                    ))}
                </Tabs.TabPane>
                <Tabs.TabPane tab="你关注的仓库" key="stars">
                    {userStartRepos.map((repo) => (
                        <Repo key={repo.id} repo={repo} />
                    ))}
                </Tabs.TabPane>
            </Tabs>
            <style jsx>{`
                .user-info {
                    width: 200px;
                    margin-right: 40px;
                    flex-shrink: 0;
                    display: flex;
                    flex-direction: column;
                }
                .login {
                    font-weight: 800;
                    font-size: 20px;
                    margin-top: 20px;
                }
                .name {
                    font-size: 16px;
                    color: #777;
                }
                .bio {
                    margin-top: 20px;
                    color: #333;
                }
                .avatar {
                    width: 100%;
                    border-radius: 20px;
                }
                .user-repos {
                    flex-grow: 1;
                }
                .email {
                    width: 210px;
                }
            `}</style>
        </div>
    );
};
// SSR
Index.getInitialProps = async function({ ctx, reduxStore }) {
    // console.log('============ props begin ====================');
    // // console.log(Object.keys(props));
    // console.log(arguments);
    // console.log(ctx);
    // console.log(reduxStore);
    // console.log('============ props end ======================');
    const user = reduxStore.getState().user;
    if (!user || !user.id) return { isLogin: false }; // 未登录
    // 客户端情况,尝试优先读取缓存
    if (!isServer) {
        if (cache.getCache(userReposKey) && cache.getCache(userStartKey)) {
            return {
                isLogin: true,
                userRepos: cache.getCache(userReposKey),
                userStartRepos: cache.getCache(userStartKey)
            };
        }
    }
    // 用户个人的项目
    const userRepos = await request({ method: 'GET', url: '/user/repos', data: null }, ctx.req);
    // 用户Start的项目
    const userStartRepos = await request(
        { method: 'GET', url: '/user/starred', data: null },
        ctx.req
    );
    return {
        isLogin: true,
        userRepos: userRepos.data,
        userStartRepos: userStartRepos.data
    };
};

const mapStateToProps = (state) => {
    return { user: state.user };
};
export default connect(mapStateToProps)(Index);
