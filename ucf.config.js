
export default () => {
    return {
        // 启动这两个模块，不启动调试，关闭构建
        bootList: [
            "ucf-app-order",
            "ucf-app-staff"
        ],
    }
}

export default () => {
    return {
        // 启动所有模块
        bootList: true,
    }
}