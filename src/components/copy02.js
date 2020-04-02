import React, { useState, useEffect } from 'react';
import { isFunc } from '@/utils/utils'

function ScrollIntoView(props) {
    const { target, getScrollEle, limitValues } = props;
    const [inView, setInView] = useState(false)

    useEffect(() => {
        /** 页面滑动过程中，检测是否进入可视区域 */
        scrollListener('add')
    })

    // 滚动时间监听函数
    const scrollListener = (type) => {
        let scrollTarget = isFunc(getScrollEle) ? getScrollEle() : window;
        let targetEle = document.getElementById("targetDom");
        type === 'add' ?
            scrollTarget.onscroll = () => scrollHandle(targetEle) :
            scrollTarget.onscroll = () => { return false };
    }
    // 是否进入可视区域
    const scrollHandle = (ele) => {
        if (!ele) return false;
        const offset = ele.getBoundingClientRect();
        const { top, bottom } = offset;
        let flag = (top >= limitValues.top || bottom <= limitValues.bottom);
        setInView(flag);
    }

    if (!isFunc(target)) return false;
    return (
        <div id="targetDom">{target(inView)}</div>
    )
}
export default ScrollIntoView;
