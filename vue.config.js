// const webpack = require("webpack");

module.exports = {
    baseUrl: './',
    outputDir: '项目安全生产大数据统计分析平台',
    lintOnSave: true,
    runtimeCompiler: true, //关键点在这
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // 配置 webpack-dev-server 行为。
    devServer: {
        open: process.platform === 'darwin',
        //韩磊
        // host:'192.168.2.166',
        //服务器
        // host:'129.28.66.56',
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
        proxy: null, // string | Object
        before: app => {}
    },
    configureWebpack: {
        // plugins: [
        //     new webpack.ProvidePlugin({
        //         jQuery: 'jquery',
        //         $: 'jquery'
        //     })
        // ]
    }
};