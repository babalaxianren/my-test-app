
/** 窗口可视区域大小 */
export const viewInfo = {
    width: Math.max(document.documentElement.offsetWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.offsetHeight, window.innerHeight || 0),
};

/**
 * 获取元素的位置
 * @param {element} element
 * @param {string or array} position
 */
export function getElementPosition(element, position) {
    let infoObj = element.getBoundingClientRect();
    if (typeof position === 'string') {
        return infoObj[position];
    } else if (Array.isArray(position)) {
        let obj = {};
        position.forEach((item, index) => obj[item] = infoObj[item])
        return obj;
    }
}