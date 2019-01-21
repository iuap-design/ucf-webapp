module.exports = () => {
    return {
        // 启动所有模块，默认这个配置，速度慢的时候使用另外的配置
        // bootList: true,

        // 启动这两个模块，不启动调试，关闭构建
        bootList: [
            "demo-app-org",
            "demo-app-staff"
        ],
        // 代理的配置
        proxy: [
            {
                enable: true,
                headers: {
                    // 与下方url一致
                    "Referer": "http://ucf-org-demo.test.app.yyuap.com"
                },
                //要代理访问的对方路由
                router: [
                    '/iuap'
                ],
                url: 'http://ucf-org-demo.test.app.yyuap.com'
            }
        ],
        // 全局环境变量
        global_env: {
            GROBAL_HTTP_CTX: JSON.stringify("/iuap_walsin_demo"),
        },
        // 别名配置
        alias: {
            //'ucf-apps': path.resolve(__dirname, 'ucf-apps/')
        },
        // 构建排除指定包
        externals: {
            //'tinper-bee': 'TinperBee'
        },
        // 调试服务需要运行的插件
        devPlugins: [],
        // 构建服务需要运行的插件
        buildPlugins: []
    }
}