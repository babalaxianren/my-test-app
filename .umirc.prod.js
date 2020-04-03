const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

//线上环境
export default {
    define: {
        'process.env.UMI_ENV': process.env.UMI_ENV,
        'process.env.BASE_URL': 'https://xxxx.com',
    },
    chainWebpack(config, { webpack }) {
        // 增加包分析插件
        config
            .plugin('analyzeBundle')
            .use(BundleAnalyzerPlugin);
    }
}