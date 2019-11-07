import { ReactChild, useCallback, useState } from 'react';
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
// FIXME 这个style对象是否可以换成class?
const styleObj: any = {
    githubIcon: {
        color: 'white',
        fontSize: 40,
        display: 'block',
        paddingTop: 10,
        marginRight: 20
    },
    footer: { textAlign: 'center' }
};

function PageLayout(props: IProps) {
    const router: NextRouter = useRouter();
    const { children } = props;
    const urlQuery = (router.query && router.query.query) || '';

    const [search, setSearch] = useState(urlQuery); // searchState
    const handleOnChange = useCallback((e) => setSearch(e.target.value || ''), [setSearch]);
    const handleOnSearch = useCallback(() => {
        if (!search) return message.error('搜索内容不能为空');
        router.push(`/search?query=${search}`);
    }, [router, search]);

    return (
        <Layout>
            <Header>
                <WithContainer Component={<div className="header-inner" />}>
                    <div className="header-left">
                        {/* FIXME 这里的层次结构可以精简下 */}
                        <>
                            <Link href="/">
                                <a>
                                    <Icon type="github" style={styleObj.githubIcon} />
                                </a>
                            </Link>
                        </>
                        <div>
                            <Input.Search
                                placeholder="搜索仓库"
                                value={search}
                                onSearch={handleOnSearch}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="header-right">
                        <UserInfo user={props.user} logout={props.logOut} />
                    </div>
                </WithContainer>
            </Header>
            <Content>{children}</Content>
            <Footer style={styleObj.footer}>Develop by max</Footer>
            <style jsx>{`
                .header-inner {
                    display: flex;
                    justify-content: space-between;
                }
                .header-left {
                    display: flex;
                    justify-content: flex-start;
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
