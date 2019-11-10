import { NextPageContext, NextComponentType } from 'next';
import { FunctionComponent } from 'react';
import { Store } from 'redux';
import { AppContext } from 'next/app';
interface INextProps extends AppContext {
    reduxStore: Store;
    [props: string]: any;
}
export type IGetInitialProps = (props: INextProps) => object;

export interface INextFC<P> extends FunctionComponent<P> {
    getInitialProps?: IGetInitialProps;
}
