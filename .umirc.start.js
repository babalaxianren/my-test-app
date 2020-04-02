
//本地开发环境
export default {
    mock: {
        exclude: [
            'mock/**.js',
            'mock/**/*.js',
        ],
    },
    define: {
        'process.env.UMI_ENV': process.env.UMI_ENV,
        'process.env.BASE_URL': '',
        // 'process.env.BASE_URL': 'http://test.user-center.ieltsbro.com',
    },
    // proxy: {
    //     '/hcp': {
    //         target: 'http://test.user-center.ieltsbro.com',
    //         pathRewrite: { '^/hcp': '/hcp' },
    //         changeOrigin: true
    //     },
    // },
    
}