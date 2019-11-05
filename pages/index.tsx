import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getConfig from 'next/config';
import { withRouter, Router } from 'next/router';
import { Tabs, Button, Icon } from 'antd';

import { request } from '$lib/request';
import { Repo } from '$components/repo';

const isServer = typeof window === 'undefined';
const { publicRuntimeConfig } = getConfig();

// 用于缓存用户项目列表
let cachedUserRepos;
let cachedUserStartRepos;
interface IProps {
    user: {
        [param: string]: any;
    };
    router: Router;
    userRepos: any[];
    userStartRepos: any[];
}
function Index({ user, router, userRepos, userStartRepos }: IProps) {
    // getInitialProps,redux,router,dispatch.
    const tabKey = (router.query.tabs as string) || 'stars';

    // repos缓存 effect
    useEffect(() => {
        if (!isServer) {
            cachedUserRepos = userRepos;
            cachedUserStartRepos = userStartRepos;
            setTimeout(() => {
                cachedUserRepos = null;
                cachedUserStartRepos = null;
            }, 1000 * 60 * 10);
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
                .root {
                    display: flex;
                    align-items: flex-start;
                    padding: 20px 0;
                    max-width: 1200px;
                    margin: 0 auto;
                }
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
                    border-radius: 5px;
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
}
// 服务端渲染
Index.getInitialProps = async function({ ctx, reduxStore }) {
    const user = reduxStore.getState().user;
    if (!user || !user.id) return { isLogin: false };

    // 客户端情况,尝试优先读取缓存
    if (!isServer) {
        if (cachedUserRepos && cachedUserStartRepos) {
            return {
                isLogin: true,
                userRepos: cachedUserRepos,
                userStartRepos: cachedUserStartRepos
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
    let resultData = {
        isLogin: true,
        userRepos: userRepos.data,
        userStartRepos: userStartRepos.data
    };
    return resultData;
};

const mapStateToProps = (state) => {
    return { user: state.user };
};
export default withRouter(connect(mapStateToProps)(Index));
