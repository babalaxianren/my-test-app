import React, { Component } from 'react';
import { isFunc } from '@/utils/utils'

export default class ScrollIntoView extends Component {
    state = { inView: false }

    componentDidMount() {
        /** 页面滑动过程中，检测是否进入可视区域 */
        this.scrollListener()
    }
    // 滚动时间监听函数
    scrollListener = () => {
        const { getScrollEle } = this.props;
        let scrollTarget = isFunc(getScrollEle) ? getScrollEle() : window;
        let targetEle = document.getElementById("targetDom");
        scrollTarget.onscroll = () => this.scrollHandle(targetEle)
    }
    // 是否进入可视区域
    scrollHandle = (ele) => {
        if (!ele) return false;
        const { limitValues } = this.props;
        const offset = ele.getBoundingClientRect();
        const { top, bottom } = offset;
        let flag = (top >= limitValues.top || bottom <= limitValues.bottom);
        this.setState({ inView: flag })
    }

    render() {
        const { target } = this.props;
        if (!isFunc(target)) return false;
        return (
            <div id="targetDom">
                {target(this.state.inView)}
            </div>
        )
    }
}
/**
 * getScrollEle : (optional func)  滚动盒子的element eg:document.querySelector('xxxxx')
 * limitValues.top : (required number) 自定义可视区域的top
 * limitValues.bottom :（required number）自定义可视区域的bottom
 * target : （required function）子组件（单个，非数组）
 *
 *  <ScrollIntoView
 *    limitValues={{top:0,bottom:300}}
 *    target={(status) => <TargetTest status={status} />}
 *  />
 */