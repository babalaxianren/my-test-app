# 前言
简单的测试项目。目前佛系更新中....
- 


# 技术栈
- react + umi + dva + less + umi-request + react-hooks + wechat-pay/ali-pay + rem
- 备注：相关资料可参考 ./sources.text

# 项目运行
- 注意：该项目中使用ES6/ES7特性、及react-hooks，请保持 node版本在8.0.0及以上。react/react-dom版本在16.8.0及以上。
```bash

项目启动
yarn (推荐) 或 npm i
yarn mock (mock环境)
yarn start (本地开发环境)

项目打包
yarn build-test (测试环境)
yarn build-prod （正式环境）

```
# 说明
- utls工具库
    utils/pay.js 
    可参考wechat-pay(JS支付和H5支付模式) & alipay 

    utils/request.js 
    基于umi-request，封装request函数

    utils/scrollpolyfill.js
    scroll相关滚动事件拓展

- mock 
     mock 模拟数据可参考umi mock.
     模拟请求响应（响应延迟），参考 express 相关知识。eg：./mock/home.js

- umirc.*.js (webpack配置)
    非线上环境跨域解决：
    请求跨域前端解决，在umirc.*.js文件中配置proxy代理，线上环境不可使用代理。

    浏览器兼容 & 移动端设备系统兼容：
    在umirc.js中，增加targets，配置浏览器最低版本，会自动引入 polyfill 和做语法转换，配置的 targets 会和合并到默认值，所以不需要重复配置。
    targets.key可选： chrome, opera, edge, firefox, safari, ie, ios, android, node, electron，值为最低需要支持的版本号。

    ....后续补充

- components
    components下组件在补充中...，最终目标均为纯函数组件。

- .env

- document.ejs 











