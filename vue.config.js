// vue.config.js
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: config => {
        //路径配置
        config.resolve.alias
            .set('assets', resolve('src/assets'))
            .set('styles', resolve('src/assets/styles'))

        const svgRule = config.module.rule('svg') // 找到svg-loader
        svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
        svgRule.test(/\.svg$/).use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' })
    },

    // webpack-dev-server 相关配置  
    devServer: {
        // 调试端口
        port: 8089
    },
}