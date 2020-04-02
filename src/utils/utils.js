
/** 判断是否为number类型 */
export const isNum = (num) => (typeof num === 'number')

/** 是否为function类型 */
export const isFunc = (fn) => (typeof fn === 'function')

/** 是否为undefined */
export const isUndefined = (str) => (typeof str === 'undefined')

/** 是否为object类型 */
export const isObj = (obj) => (typeof obj === 'object')

/** 是否为array类型 typeof arr === "object" */
export const isArr = (arr) => (Array.isArray(arr))

/** 数组浅拷贝 */
export const arrClone = (arr) => Array.from(arr);

/** 数组深拷贝 */
export const recursiveClone = (val) => {
    return Array.isArray(val) ? Array.from(val, recursiveClone) : val;
}
/** 对象深拷贝 */
export const deepClone = (obj) => {
    if (obj === null) return null;
    if (typeof obj !== "object") return obj;
    if (typeof window !== 'undefined' && window.JSON) { // 浏览器环境下 并支持window.JSON 则使用 JSON
        return JSON.parse(JSON.stringify(obj));
    }
    if (obj instanceof RegExp) { // 正则
        return new RegExp(obj);
    }
    if (obj instanceof Date) { // 日期
        return new Date(obj);
    }
    // 不直接创建空对象的目的：克隆的结果和之前保持所属类  =》 即能克隆普通对象，又能克隆某个实例对象
    let newObj = new obj.constructor();
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}


/** 数组去重 */
export const unique = arr => [...new Set(arr)];

/** Map结构转为array ：map =>new Map() */
export const formatMapToArray = (map) => ([...map])

/**
 * 时间相关的方法
 */
export const DateUtils = {
    now: new Date(),
    getTime: (date) => {/** getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。ms */
        return date ? new Date(date).getTime() : new Date().getTime();
    },
    getHours: (date) => {
        return date ? new Date(date).getHours() : new Date().getHours();
    },
    getMinutes: (date) => {
        return date ? new Date(date).getMinutes() : new Date().getMinutes();
    },
    getMonth: (date) => {
        return date ? new Date(date).getMonth() + 1 : new Date().getMonth() + 1;
    },
    getDay: (date) => {
        return date ? new Date(date).getDate() : new Date().getDate();
    },
    getWeekDay: (date) => {
        return date ? new Date(date).getDay() : new Date().getDay();/** 0：周日 */
    },
    formatDateNormal: (date) => {/** 格式化成 yy-mm-dd hh:mm:ss eg:"1970-01-01 08:00:00"*/
        let dd = new Date(date).toJSON();
        return new Date(+new Date(dd) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
}

/**
 * 复制文本
 * @param {*} text 
 */
export const copyText = text => {
    const input = document.createElement('input');
    //防止 ios 弹键盘
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    document.execCommand('copy');
    document.body.removeChild(input);
};

/**
 * 防抖 - debounce 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触* 发了事件，就重新开始延时。
 */
export const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

/**
 * 节流 - throttle 当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
 */
export const throttle = (fn, delay = 500) => {
    let flag = true;
    return (...args) => {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true;
        }, delay);
    };
};















