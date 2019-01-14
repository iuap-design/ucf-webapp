/**
 * request服务请求处理
 */

import axios from "axios";

//CSRF
let x_xsrf_token = '',
    random_num = Math.random();

/**
 * 参数：url 请求的服务地址
 * 参数：options 请求参数选项，包括 method 方法类型、params GET参数、data POST参数
 */
export default (url, options) => {
    let params = Object.assign({}, options.params, options.method.toLowerCase() == 'get' ? {
        r: Math.random()
    } : {});
    return axios({
        timeout: 8000,
        method: options.method,
        url: url,
        data: options.data,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'random-num': random_num,
            'x-xsrf-token': x_xsrf_token
        },
        params,

    }).then(function (res) {
        // console.log('axios res', res);
        let inner_x_xsrf_token = res.headers['x-xsrf-token'];//added by yany
        if (inner_x_xsrf_token) {
            x_xsrf_token = inner_x_xsrf_token;
        }

        return new Promise((resolve, reject) => {
            resolve(res.data);
        })
    }).catch(function (err) {
        console.log(err);
        let res = err.response;
        if (res) {
            let { status, data: { msg } } = res;

            switch (status) {
                case 401:
                    console.log("RBAC鉴权失败!" + msg);
                    return Promise.resolve(res);
                case 306:
                    window.top.location.href = '/wbalone/pages/login/login.html';
                    break;
                default:
            }

        }

    });
}
