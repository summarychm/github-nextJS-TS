// 根据 Component属性(ReactElement|string)动态创建组件,并将获取到的props都作为自身属性渲染,减少 dom 层次,提升灵活性
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

function withContainer({ children, Component }: IProps) {
    if (typeof Component === 'string')
        return React.createElement(Component, {
            style: styleObj,
            children
        });
    else
        return React.cloneElement(Component, {
            style: { ...styleObj, ...Component.props.style },
            children
        });
}
export default withContainer;
