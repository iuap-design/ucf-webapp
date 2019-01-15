import request from "utils/request";
//定义接口地址
const URL = {
    "POST_LIST": `${GROBAL_HTTP_PREFIX}/mock/326/loadList`,
    "POST_DELETE": `${GROBAL_HTTP_PREFIX}/mock/326/deleteList`
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