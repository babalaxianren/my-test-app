/**
 * request 网络请求工具封装
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 * 参考blog: https://zhuanlan.zhihu.com/p/88997003
 */
import { extend } from 'umi-request';
import { Toast } from 'antd-mobile';
import router from 'umi/router';
/** process.env 可获取.umirc.xxx.js文件中define的全局变量 */
const baseUrl = process.env.BASE_URL;
const baseEnv = process.env.UMI_ENV;
const localStroage = window.localStorage;

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 开发环境下，增加控制台日志
 */
const addConsoleLog = (logInfo) => {
    if (baseEnv !== 'prod') {
        console.log(`log:${JSON.stringify(logInfo)}`)
    }
}

/**
 * 异常处理程序：接口响应的特殊自定义错误码处理
 */
const errorHandler = error => {
    const { response = {} } = error;
    let errortext = codeMessage[response.status] || response.statusText;
    const { status } = response;
    addConsoleLog(response);

    if (status === 401) {/** token失效处理 */
        Toast.fail(`登录已过期，请重新登录`, 2);/** 页面中 toast 提示 */
        localStroage && localStroage.removeItem('token');/** 清除掉缓存在本地存储的 token */
        router.replace({ pathname: '/login' });/** 跳转到登陆页面 */
        return;
    }
    Toast.fail(errortext, 2);/** 页面弹出错误提示 */
    return error;
};

/**
 * api 的URL处理
 * @param {*} url 
 */
const urlFormat = (url) => {
    let netAddressReg = /^(http|https|ftp)\:/gi;
    let isCompleteUrl = netAddressReg.test(url);//url.startsWidth("http")
    return isCompleteUrl ? url : baseUrl + url;
}

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    errorHandler, // 默认错误处理
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
    let { method = 'GET', params, headers, data = {}, ...rest } = options;
    let newUrl = urlFormat(url);
    let token = localStroage.getItem('token');
    return (
        {
            url: newUrl,
            method: method,
            /**
             * 'params' 是即将于请求一起发送的 URL 参数，参数会自动 encode 后添加到 URL 中
             * 类型需为 Object 对象或者 URLSearchParams 对象
             */
            params: { ...params },/** get 请求的参数 */
            headers: {
                'Content-Type': 'application/json',/** 默认 */
                'Authorization': `Bear ${token}`,/** 携带token */
                /** 此处可增加自定义的headers */
                ...headers
            },
            /** post 请求的参数：
             * 'data' 作为请求主体被发送的数据
             * 适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
             * 必须是以下类型之一：
             * - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
             * - 浏览器专属：FormData, File, Blob
             * - Node 专属： Stream 
             **/
            data: data,/**  post 请求的参数 */
            timeout: 60000,/** 响应超时时间，秒s，表示：当请求连接成功后，1000秒还未完成功响应，则停止该请求，请求失败 */
            prefix: '',/** 前缀，统一设置 url 前缀 */
            suffix: '',/** 后缀，统一设置 url 后缀 */
            /**
             * 'credentials' 发送带凭据的请求
             * 为了让浏览器发送包含凭据的请求（即使是跨域源），需要设置 credentials: 'include'
             * 如果只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加credentials: 'same-origin'
             * 要改为确保浏览器不在请求中包含凭据，请使用credentials: 'omit'
             * 
             * omit: 从不发送cookies.
             * same-origin: 只有当URL与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息.(浏览器默认值,在旧版本浏览器，例如safari 11依旧是omit，safari 12已更改)
             * include: 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息.
             */
            credentials: 'same-origin', // 默认
            /**
             * 'useCache' 是否使用缓存，当值为 true 时，GET 请求在 ttl 毫秒内将被缓存，缓存策略唯一 key 为 url + params 组合
             */
            useCache: false, // 默认
            ttl: 60000,/** 'ttl' 缓存时长（毫秒）， 0 为不过期 */
            maxCache: 0,/** 'maxCache' 最大缓存数， 0 为无限制 */
            /**
             * 'charset' 当服务端返回的数据编码类型为 gbk 时可使用该参数，umi-request 会按 gbk 编码做解析，避免得到乱码, 默认为 utf8， 当 parseResponse 值为 false 时该参数无效
             */
            charset: 'gbk',
            /**
             * 'responseType': 如何解析返回的数据，当 parseResponse 值为 false 时该参数无效
             *  默认为 'json', 对返回结果进行 Response.text().then( d => JSON.parse(d) ) 解析
             *  其他(text, blob, arrayBuffer, formData), 做 Response[responseType]() 解析
             */
            responseType: 'json', // 默认
            /** 
             * 'paramsSerializer' 开发者可通过该函数对 params 做序列化
             * （注意：此时传入的 params 为合并了 extends 中 params 参数的对象，如果传入的是 URLSearchParams 对象会转化*  为 Object 对象 */
            // paramsSerializer: function (params) {
            //     return Qs.stringify(params, { arrayFormat: 'brackets' })
            // },
            ...rest,/** 其他参数 */
        }
    );
});

// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
    return response
});

export default request;
