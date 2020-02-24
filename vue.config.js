const path = require('path')
module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('components', path.resolve(__dirname, './src/components'))
            .set('pages', path.resolve(__dirname, './src/pages'))
            .set('assets', path.resolve(__dirname, './src/assets'))
            .set('utils', path.resolve(__dirname, './src/utils'))
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    },
    devServer: {
        proxy: {
            '/rexxar': {
                target: 'https://m.douban.com',
                changeOrigin: true
            },
            '/api': {
                target: 'https://market.douban.com',
                changeOrigin: true
            },
            '/book': {
                target: 'https://market.douban.com',
                changeOrigin: true
            },
            '/search': {
                target: 'https://m.douban.com',
                changeOrigin: true
            }
        }
    }
}