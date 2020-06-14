module.exports = {
    devServer: {
        port: 8080,  // dev模式的端口
        disableHostCheck: true  // host请求头的检测，设置为true可以在公网服务器上使用dev模式
    },
    publicPath: '/static/learning_logs',  // 打包后的静态路径
    // 没有书写outputDir属性   默认'dist'  对应dev.assetsSubDirectory.
    // outputDir: 'dist/static',
};
