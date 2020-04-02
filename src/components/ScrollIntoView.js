import React, { useState, useEffect } from 'react';
import { isFunc } from '@/utils/utils'

function ScrollIntoView(props) {
    const { target, getScrollEle, limitValues } = props;
    const [inView, setInView] = useState(false)

    useEffect(() => {
        /** 页面滑动过程中，检测是否进入可视区域 */
        scrollListener('add')
    }, [getScrollEle])

    // 滚动时间监听函数
    const scrollListener = () => {
        let scrollTarget = isFunc(getScrollEle) ? getScrollEle() : window;
        let targetEle = document.getElementById("targetDom");
        if (targetEle) {
            scrollTarget.onscroll = () => {
                const { top = 0, bottom = 0 } = targetEle.getBoundingClientRect();
                let flag = (top > limitValues.top && top < limitValues.bottom) || (bottom < limitValues.bottom && bottom > limitValues.top);
                setInView(flag);
            }
        }
    }

    if (!isFunc(target)) return false;
    return (
        <div id="targetDom"> {target(inView)} </div>
    )
}
export default ScrollIntoView;
