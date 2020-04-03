
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
    },
    proxy: {
        '/api': {
            target: 'http://dev.xxxxx.com',
            pathRewrite: { '^/api': '/api' },
            changeOrigin: true
        },
    },
    
}