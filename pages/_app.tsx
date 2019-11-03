import App from 'next/app';
import { Router } from 'next/router';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import '../public/style/global.css';

import Layout from '../layouts';
import { withReduxStore } from '$lib/with-redux-store';
import { withLoading } from '$components/with-loading';

interface IProps {
    Component: React.ReactElement;
    pageProps: any;
    reduxStore: Store;
}
class MyApp extends App<IProps> {
    // SSR/ RouterChange
    public static async getInitialProps(ctx) {
        const { Component } = ctx;
        let pageProps = {};
        // 调用要渲染组件的 getInitialProps
        if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
        return { pageProps };
    }
    public render() {
        const { Component, pageProps, reduxStore } = this.props;
        return (
            <Provider store={reduxStore}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        );
    }
}
export default withReduxStore(withLoading(MyApp));
