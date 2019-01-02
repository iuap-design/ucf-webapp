import request from "utils/request";
import { deepClone } from 'utils';

//定义接口地址
const URL = {
    "GET_DETAIL": `${GROBAL_HTTP_CTX}/allowances/list`, //通过search_id 查询列表详情
    "SAVE_ORDER": `${GROBAL_HTTP_CTX}/allowances/save`, //添加和修改
    "DEL_ORDER": `${GROBAL_HTTP_CTX}/allowances/deleteBatch`,
    "GET_LIST": `${GROBAL_HTTP_CTX}/allowances/list`, //获取列表
}

/**
 * 获取列表
 * @param {*} params
 */
export const getList = (param) => {
    let newParam = Object.assign({},param),
    pageParams = deepClone(newParam.pageParams);

    delete newParam.pageParams;
    return request(URL.GET_LIST, {
        method: "post",
        data: param,
        param : pageParams
    });
}

/**
 * 删除table数据
 * @param {*} params
 */
export const deleteList = (params) => {
    return request(URL.DEL_ORDER, {
        method: "post",
        data: params
    });
}

/**
 * 添加和修改
 * @param {*} params
 */

export const saveOrder = (params) => {
    return request(URL.SAVE_ORDER, {
        method: "post",
        data: params
    });
}

/**
 * 通过search_id 查询列表详情
 */

export const getDetail = (param) => {
    return request(URL.GET_DETAIL, {
        method: "get",
        param
    });
}
