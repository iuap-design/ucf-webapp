# 基于 UCF 的大型企业应用开发

开发思路：[大型企业应用在前端微应用视角下的思考](https://github.com/iuap-design/blog/issues/306)

## 工程规范


## uba 命令

```
# 创建应用（单页或多页，平铺在顶级目录）
$ uba new walsin-app-order
# 命令行式的交互选择
```

## demo 案例


## 待定：workbench 发布和集成


## ucf-request 封装




// 发布   package name: ucf-request API、扩展

## 标准 HTTP 规范


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

## 模型驱动 HTTP 规范


```

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


## 静态资源 CDN

```
{
    publishPath: "https://cdn.yonyoucloud.com/static/"
}
```

## 考虑专属云和公有云两种应用模式

1、引用的公共资源：
2、构建产出上云 OR 私有化
3、动态配置（变量），配置中心。运行时


## traceId 

## 数据埋点

## ucf-common的定义：留给项目自定义

1、收敛：哪些东西放common
- ucf-request
- tinper-bee 静态资源
- 业务模块级的公共组件？？？？？？？Header等
2、持续更新：common的东西持续更新
3、模块化：是否发布package。不发包




