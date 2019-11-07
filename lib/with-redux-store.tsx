import React from 'react';
import { Store } from 'redux';

import createRootStore from '../store';

const isServer = !process.browser;
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

// 获取/创建store实例(Server&Client端通用)
function getOrCreateStore(initialState?): Store {
    // Server端直每次创建新的store,否则会request间共享store,导致server/client状态不一致.
    if (isServer) {
        // console.log('Server端运行!');
        return createRootStore(initialState);
    }
    // Client端共用同一store并使用全局变量缓存
    else {
        console.log('client端运行!');
        if (!window[__NEXT_REDUX_STORE__])
            window[__NEXT_REDUX_STORE__] = createRootStore(initialState);
        return window[__NEXT_REDUX_STORE__];
    }
}

interface IProps {
    initialReduxState: Object;
}
/**
 * 为组件增加redux功能(HOC)
 * @param WrappedComponent 要实现redux的Component
 */
export const withReduxStore = (WrappedComponent) => {
    function WithComponent(props) {
        const reduxStore = getOrCreateStore(props.initialReduxState);
        return <WrappedComponent {...props} reduxStore={reduxStore} />;
    }
    WithComponent.getInitialProps = async function(appContext) {
        let appProps = {};
            let initialValue = {};
        if (isServer) {
            const session = appContext.ctx.req.session;
            if (session) initialValue = { user: session.userInfo };
        }
        const store = getOrCreateStore(initialValue);
        appContext.reduxStore = store; // 挂载到ctx
        if (typeof WrappedComponent.getInitialProps === 'function')
            appProps = await WrappedComponent.getInitialProps(appContext);

        return {
            ...appProps,
            initialReduxState: store.getState()
        };
    };
    return WithComponent;
};
