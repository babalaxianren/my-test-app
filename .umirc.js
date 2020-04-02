
// ref: https://umijs.org/config/
// cn ref: https://umijs.org/zh/guide/config.html
export default {
  treeShaking: true,
  exportStatic: true,
  targets: {/** 浏览器&设备系统 版本兼容 */
    chrome: 35, firefox: 40, safari: 10, edge: 10, ios: 10, android: 4.40
  },
  hash: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,//推荐开启 dva-immer 以简化 reducer 编写
      },
      dynamicImport: {
        webpackChunkName: true,
        level: 2
      },
      title: 'myapp',
      dll: false,
      fastClick: true,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  //ref:https://github.com/neutrinojs/webpack-chain
  chainWebpack(config, { webpack }) {
    //   config.resolve.modules
    //     .add(['./src/components', 'node_modules'])
  }

}
