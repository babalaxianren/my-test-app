
/**
 * umi 约定 src 目录下的 app.js 为运行时的配置文件。
 * patchRoutes: 用于运行时修改路由。
 * render:用于改写把整个应用 render 到 dom 树里的方法。eg:渲染应用之前做权限校验，不通过则跳转到登录页
 * onRouteChange:用于在初始加载和路由切换时做一些事情。eg:埋点，初次加载时也会执行，但 action 为 undefined
 * rootContainer:用于封装 root container，可以取一部分，或者外面套一层，等等。
 * modifyRouteProps:修改传给路由组件的 props。
 * https://umijs.org/zh/guide/runtime-config.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE%EF%BC%9F
 */

import { scrollPolyfill } from '@/utils/scrollPolyfill';
scrollPolyfill();

/**
 * 创建应用，返回 dva 实例。(注：dva 支持多实例)
 * https://dvajs.com/api/#app-dva-opts
 */
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
  plugins: [
    // require('dva-logger')(),//开发时打开，可以看到model中数据更新的流程
  ],
};

/**
 * modifyRouteProps:修改传给路由组件的 props。
 * @param {*} props 
 * @param {*} param1 
 */
export function modifyRouteProps(props, { route }) {
  // console.log(props)
  return { ...props};
}
