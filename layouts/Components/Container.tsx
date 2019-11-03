// 根据 Component属性(ReactElement/string)动态创建组件,并将获取到的props都作为自身属性渲染,减少 dom 层次,提升灵活性
import React, { ReactChild, ReactElement } from 'react';

const styleObj = {
    width: '100%',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20
};
interface IProps {
    children: ReactChild | ReactChild[];
    Component: ReactElement | string;
}

const Container = function Container(props: IProps) {
    let newElement = null;
    const { children, Component } = props;
    if (typeof Component === 'string') {
        newElement = React.createElement(Component, {
            style: styleObj,
            children
        });
    } else
        newElement = React.cloneElement(Component, {
            style: { ...styleObj, ...Component.props.style },
            children
        });
    return newElement;
};
export default Container;
