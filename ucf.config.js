require('@babel/polyfill');
/**
 * UCF配置文件 更多说明文档请看 https://github.com/iuap-design/ucf-web/blob/master/packages/ucf-scripts/README.md
 */

module.exports = (env, argv) => {
    return {
        context: "",// 上下文对象
        // 启动所有模块，默认这个配置，速度慢的时候使用另外的配置
        // bootList: true,
        // 启动这两个模块，启动调试、构建
        bootList: [
            "demo-app-org",
            "demo-app-staff"
        ],
        // 代理的配置
        proxy: [
            {
                enable: true,
                headers: {
                    "Referer": "http://iuap-meger-demo.test.app.yyuap.com"
                },
                //要代理访问的对方路由
                router: [
                    '/iuap'
                ],
                url: 'http://iuap-meger-demo.test.app.yyuap.com'
            }, {
                enable: true,
                headers: {
                    "Referer": "https://mock.yonyoucloud.com/mock/326"
                },
                //要代理访问的对方路由
                router: ["/wbalone/appmenumgr/newSidebarList"],
                url: 'https://mock.yonyoucloud.com/mock/326'
            },
            {
                enable: true,
                headers: {
                    "Referer": "http://172.20.52.215:8888"
                },
                //要代理访问的对方路由
                router: [
                    '/iuap_walsin_demo',
                    '/iuap-saas-message-center/',
                    '/iuap-saas-filesystem-service/',
                    '/wbalone',
                    '/print_service/',
                    '/eiap-plus',
                    '/iuap-print/'
                ],
                url: 'http://172.20.52.215:8888'
            }
        ],
        // 静态托管服务
        static: 'ucf-common/src/static',
        // 展开打包后的资源文件，包含图片、字体图标相关
        res_extra: false,
        // 构建资源的时候产出sourceMap，调试服务不会生效
        open_source_map: false,
        // CSS loader 控制选项
        css: {
            modules: false
        },
        // 全局环境变量
        global_env: {
            GROBAL_HTTP_CTX: JSON.stringify("/iuap_demo"),
        },
        // 别名配置
        alias: {
            //'ucf-apps': path.resolve(__dirname, 'ucf-apps/')
        },
        // 构建排除指定包
        externals: {
            //'tinper-bee': 'TinperBee'
        },
        // 加载器Loader
        loader: [],
        // 调试服务需要运行的插件
        devPlugins: [],
        // 构建服务需要运行的插件
        buildPlugins: []
    }
}