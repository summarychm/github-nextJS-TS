import { ReactChild, useCallback, useState, ChangeEvent } from 'react';
import { Layout, Icon, Input, message } from 'antd';
import { connect } from 'react-redux';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';

import { UserInfo } from '$components/userInfo';
import WithContainer from './withContainer'; // HOC,减少DOM层级
import userAction from '../store/actions/user';

interface IProps {
    children: ReactChild;
    user: any;
    logOut?: () => void;
}

const { Header, Content, Footer } = Layout;

function PageLayout({ children, user, logOut }: IProps) {
    const router: NextRouter = useRouter();
    const urlQuery = (router.query && router.query.query) || '';

    const [searchVal, setSearch] = useState(urlQuery);
    const handleOnChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value || ''),
        [setSearch]
    );
    const handleOnSearch = useCallback(() => {
        if (!searchVal) return message.error('搜索内容不能为空');
        router.push(`/search?query=${searchVal}`);
    }, [router, searchVal]);

    return (
        <Layout>
            <Header>
                <WithContainer Component={<div className="header-inner" />}>
                    <div className="header-left">
                        <Link href="/">
                            <a className="github-icon">
                                <Icon type="github" />
                            </a>
                        </Link>
                        <div>
                            <Input.Search
                                placeholder="搜索仓库"
                                value={searchVal}
                                onSearch={handleOnSearch}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="header-right">
                        <UserInfo user={user} logout={logOut} />
                    </div>
                </WithContainer>
            </Header>
            <Content>{children}</Content>
            <Footer>
                <span className="footer-title">Develop by max</span>
            </Footer>
            <style jsx>{`
                .header-inner {
                    display: flex;
                    justify-content: space-between;
                }
                .header-left {
                    display: flex;
                    justify-content: flex-start;
                }
                .github-icon {
                    color: white;
                    font-size: 40px;
                    display: block;
                    margin-right: 20px;
                }
                .footer-title {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    font-size: 16px;
                }
            `}</style>
        </Layout>
    );
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(
    mapStateToProps,
    userAction
)(PageLayout);
