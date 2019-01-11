# 基于 UCF 的大型企业应用开发

开发思路：[大型企业应用在前端微应用视角下的思考](https://github.com/iuap-design/blog/issues/306)


## TODO

- [ ] [框架规范说明文档]()
- [ ] [uba 命令new的实现，uba 高度封装的实现]()
- [ ] [基于 ucf-web 框架的 demo 案例产出]()
- [ ] [讨论并确定 ucf-workbench 工作台的发布以及和微应用的集成调试]()
- [ ] [结合前后端的HTTP规范封装出  ucf-request 并发布，考虑数据埋点的影响]()
- [ ] [统一标准的 HTTP 规范]()
- [ ] [关于ucf-common：留给项目自定义项目级的公共逻辑]()
- [ ] [需要支持动态变量的配置，如publicPath、traceId等]()


## 附录

### 1、对 uba 的需求
```
# 创建应用（单页或多页，平铺在顶级目录）
$ uba new walsin-app-order
# 命令行式的交互选择
```

### 2、HTTP 的部分规范
```

{
    // 1、网络层
    // 200

    // 2、应用层
    // 请求超时
    // 未登录，跳转到登录页面
    // 没有权限，

    // 3、UI 
    // UI  提示规范

    code: "",
    data: {
        // 1、标准
        viewApplication: [],
        key: "xx"
        aa: {},
        bb: []
    },
    message: ""
}
```

```
// 模型驱动 HTTP 规范
{
    // 200
    // 请求超时
    // 未登录，跳转到登录页面
    // 没有权限，
    code: "",

    data: {
        // 2、模型驱动，描述清楚。文档
        viewApplication: [],
        viewModel: []
    },
    message: ""
}
```




