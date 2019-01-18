/**
 * 服务请求类
 */
import request from "ucf-request";
//定义接口地址
const URL = {
    "POST_LIST": `${GROBAL_HTTP_PREFIX}/iuap/org/list`,
    "POST_DELETE": `${GROBAL_HTTP_PREFIX}/iuap/org/delete`,
    "POST_INSERT": `${GROBAL_HTTP_PREFIX}/iuap/org/add`,
    "POST_UPDATE": `${GROBAL_HTTP_PREFIX}/iuap/org/update`
}

/**
 * 获取主列表
 * @param {object} params
 */
export const getList = (data) => {
    return request(URL.POST_LIST, {
        method: "post",
        data
    });
}

/**
 * 删除数据
 * @param {object} params
 */
export const postDelete = (data) => {
    return request(URL.POST_DELETE, {
        method: "post",
        data
    });
}

/**
 * 添加数据
 * @param {object} params
 */
export const postInsert = (data) => {
    return request(URL.POST_INSERT, {
        method: "post",
        data
    });
}

/**
 * 修改数据
 * @param {object} params
 */
export const postUpdate = (data) => {
    return request(URL.POST_UPDATE, {
        method: "post",
        data
    });
}