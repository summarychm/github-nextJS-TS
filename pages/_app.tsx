import App from 'next/app';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import '../public/style/global.css';

import PageLayout from '../layouts';
import { withReduxStore } from '$lib/with-redux-store';
import { withLoading } from '$components/with-loading';

interface IProps {
    Component: React.ReactElement; // 要渲染的Component
    pageProps: any; // 要渲染Component的getInitialProps返回值
    reduxStore: Store; // 根据后端ReduxState创建的Reduxstore
}
class MyApp extends App<IProps> {
    // 触发时机: SSR / RouterChange
    static async getInitialProps(ctx) {
        const { Component } = ctx;
        let pageProps = {};
        // 调用要渲染组件的getInitialProps获取所需的props
        if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
        return { pageProps };
    }
    render() {
        const { Component, pageProps, reduxStore } = this.props;
        return (
            <Provider store={reduxStore}>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </Provider>
        );
    }
}
// HOC loading & redux
export default withReduxStore(withLoading(MyApp));
