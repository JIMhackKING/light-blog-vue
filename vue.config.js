module.exports = {
    devServer: {
        port: 8080,  // dev模式的端口
        disableHostCheck: true  // host请求头的检测，设置为true可以在公网服务器上使用dev模式
    },
    publicPath: '/static/learning_logs',  // 打包后的静态路径
    // 没有书写outputDir属性   默认'dist'  对应dev.assetsSubDirectory.
    outputDir: '../static/learning_logs',
    productionSourceMap: false,
    // 删除 HTML 相关的 webpack 插件
    chainWebpack: config => {
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    //     // // 清除css，js版本号
    //     // config.output.filename('js/[name].js');
    //     // config.output.chunkFilename('js/[name].js');
    //     // // 为生产环境修改配置...
    //     // config.plugin('extract-css').tap(args => [{
    //     //     filename: `css/[name].css`,
    //     //     chunkFilename: `css/[name].css`
    //     // }])
    },
    filenameHashing: false,
};
