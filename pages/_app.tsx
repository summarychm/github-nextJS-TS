import { Store } from 'redux';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import '../public/style/global.css';

import { INextFC, IGetInitialProps } from '$interface';
import PageLayout from '../layouts';
import { withReduxStore } from '$lib/with-redux-store';
import { withLoading } from '$components/with-loading';

interface IProps {
    Component: React.FunctionComponent; // 要渲染的Component
    pageProps: any; // 要渲染Component的getInitialProps返回值
    reduxStore: Store; // 根据后端ReduxState创建的Reduxstore
}

const MyApp: INextFC<IProps> = ({ Component, pageProps, reduxStore }) => {
    return (
        <Provider store={reduxStore}>
            <div></div>
            <PageLayout>
                <Component {...pageProps} />
            </PageLayout>
        </Provider>
    );
};

MyApp.getInitialProps = async function(prop) {
    const { Component, ctx } = prop;
    let pageProps = {};
    // 调用要渲染组件的getInitialProps获取所需的props
    if (Component.getInitialProps) pageProps = await (Component.getInitialProps as any)(prop);
    return { pageProps };
};

// HOC loading & redux
export default withReduxStore(withLoading(MyApp));
