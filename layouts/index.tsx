import { ReactChild, useCallback, useState } from 'react';
import { Dropdown, Layout, Icon, Menu, Avatar, Input, Tooltip, message } from 'antd';
import { connect } from 'react-redux';
import Link from 'next/link';
import getConfig from 'next/config';
import { withRouter, Router } from 'next/router';

import { UserInfo } from '$components/userInfo';

import Container from './Components/Container'; // HOC,减少DOM层级
import userAction from '../store/actions/user';
import userReducer from 'store/reducers/user';

const { Header, Content, Footer } = Layout;
const { publicRuntimeConfig } = getConfig();

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
interface IProps {
    children: ReactChild;
    user: any;
    router: Router;
    logOut?: () => void;
}
function MyLayout(props: IProps) {
    const { children, router } = props;
    const urlQuery = router.query && router.query.query;

    const [search, setSearch] = useState(urlQuery || '');

    const handleOnSearch = useCallback(() => {
        if (!search) return message.error('搜索内容不能为空');
        router.push(`/search?query=${search}`);
    }, [router, search]);
    const handleOnChange = useCallback((e) => setSearch(e.target.value || ''), [setSearch]);

    return (
        <Layout>
            <Header>
                <Container Component={<div className="header-inner" />}>
                    <div className="header-left">
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
                </Container>
            </Header>
            <Content>{children}</Content>
            <Footer style={styleObj.footer}>Develop by max</Footer>
            <style jsx>{`
                .content {
                    color: red;
                }
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

const mapStateToProps = function(state) {
    return { user: state.user };
};
export default connect(
    mapStateToProps,
    userAction
)(withRouter(MyLayout));
