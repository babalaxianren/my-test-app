import React, { Component } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './index.less';

/**
 *【 WrappedAnimate 动画包裹组件，传入UI组件，返回动画组件 】
 * animateName: 动画名字
 * useAnimated : true:采用 animate 动画库动画, false:使用自定义动画
 * UIElement : 纯UI组件
 * active :是否开启动画
 */
function WrappedAnimate({ ...props }) {

    const { animateName, useAnimated, UIElement, active } = props;
    return (
        <div className={
            classnames({
                'animated': useAnimated && active,
                [`${animateName}`]: useAnimated && active,
                [styles[`${animateName}`]]: !useAnimated && active,
            })}>
            {UIElement}
        </div>
    )
}

WrappedAnimate.propTypes = {
    animateName: PropTypes.string,
    useAnimated: PropTypes.bool,
    active: PropTypes.bool,
    UIElement: PropTypes.element,
};
WrappedAnimate.defaultProps = {
};
export default WrappedAnimate;