import request from "utils/request";
//定义接口地址
const URL = {

    "GET_LIST": `${GROBAL_HTTP_CTX}/passenger/list`, // 获取主表
    "SAVE_PASSENGER": `${GROBAL_HTTP_CTX}/passenger/save`, // 保存主表
    "DEL_PASSENGER": `${GROBAL_HTTP_CTX}/passenger/deleteBatch`, // 删除主表

    "GET_EMERGENCY": `${GROBAL_HTTP_CTX}/emergency_contact/list`, // 获取子表 紧急联系人
    "SAVE_EMERGENCY": `${GROBAL_HTTP_CTX}/emergency_contact/save`, // 保存子表 紧急联系人
    "DEL_EMERGENCY": `${GROBAL_HTTP_CTX}/emergency_contact/deleteBatch`, //删除字表 紧急联系人

    "GET_TRAVELING": `${GROBAL_HTTP_CTX}/traveling_information/list`, // 获取子表 TRAVELING
    "SAVE_TRAVELING": `${GROBAL_HTTP_CTX}/traveling_information/save`, // 保存子表 乘车信息
    "DEL_TRAVELING": `${GROBAL_HTTP_CTX}/traveling_information/deleteBatch`, // 删除子表 乘车信息

    "GET_QUERYPRINTTEMPLATEALLOCATE": `/eiap-plus/appResAllocate/queryPrintTemplateAllocate`,  // 查询打印模板
    "PRINTSERVER": '/print_service/print/preview',                                              // 打印

}

/**
 * 获取主列表
 * @param {*} params
 */
export const getList = (param) => {
    return request(URL.GET_LIST, {
        method: "get",
        param
    });
}
/**
 * 获取子列表 紧急联系人
 * @param {*} params
 */
export const getEmergency = (param) => {
    return request(URL.GET_EMERGENCY, {
        method: "get",
        param
    });
}

/**
 * 获取子列表 TRAVELING
 * @param {*} params
 */
export const getTraveling = (param) => {
    return request(URL.GET_TRAVELING, {
        method: "get",
        param
    });
}

/**
 * 保存主表数据
 * @param {*} params
 */
export const savePassenger = (params) => {
    return request(URL.SAVE_PASSENGER, {
        method: "post",
        data: params
    });
}

/**
 * 保存子表数据 乘车信息
 * @param {*} params
 */
export const saveTraveling = (params) => {
    return request(URL.SAVE_TRAVELING, {
        method: "post",
        data: params
    });
}

/**
 * 保存子表数据 紧急联系人
 * @param {*} params
 */
export const saveEmergency = (params) => {
    return request(URL.SAVE_EMERGENCY, {
        method: "post",
        data: params
    });
}

/**
 * 删除主表数据
 * @param {*} params
 */
export const delPassenger = (params) => {
    return request(URL.DEL_PASSENGER, {
        method: "post",
        data: params
    });
}

/**
 * 删除子表 emergency表数据
 * @param {*} params
 */
export const delEmergency = (params) => {
    return request(URL.DEL_EMERGENCY, {
        method: "post",
        data: params
    });
}

/**
 * 删除子表 Traveling数据
 * @param {*} params
 */
export const delTraveling = (params) => {
    return request(URL.DEL_TRAVELING, {
        method: "post",
        data: params
    });
}
/**
 *
 * 查询打印模板
 * @param {*} params
 * @returns
 */
export const queryPrintTemplateAllocate = (params) => {

    return request(URL.GET_QUERYPRINTTEMPLATEALLOCATE, {
        method: "get",
        param: params
    });

}

export const printDocument = (params) => {

    let search = [];
    for (let key in params) {
        search.push(`${key}=${params[key]}`)
    }
    let exportUrl = `${URL.PRINTSERVER}?${search.join('&')}`;
    console.log(exportUrl);
    window.open(exportUrl);

}
