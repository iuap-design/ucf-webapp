/**
 * 数据模型类
 */
import { actions } from "mirrorx";
import * as api from "./service";

export default {
    // 确定 Store 中的数据模型作用域
    name: "app",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        list: [],//组织实体 ID、编码、名称
        showLoading: false,//加载Loading
        selectedList: [],//当前选择行
        queryParam: {//总的查询对象
            pageIndex: 1,//分页条-当前页
            total: 50,//分页条-总记录数
        },
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) {
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        /**
         * 加载数据
         * @param {*} param
         * @param {*} getState
         */
        async loadList(params, getState) {
            let { queryParam } = getState().app;
            let result = await api.getList(params || queryParam);
            if (result.code == 200) {
                actions.app.updateState({
                    list: result.data
                });
            }
        },
        /**
         * 删除数据
         * @param {*} param
         * @param {*} getState
         */
        async postDelete(params, getState) {
            let { selectedList: deleteList } = getState().app;
            let result = await api.postDelete(deleteList);
            if (result.code == 200) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 添加数据
         * @param {*} param
         * @param {*} getState
         */
        async postInsert(params, getState) {
            let result = await api.postInsert(params);
            if (result.code == 200) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 修改数据
         * @param {*} param
         * @param {*} getState
         */
        async postUpdate(params, getState) {
            let result = await api.postUpdate(params);
            if (result.code == 200) {
                return true;
            } else {
                return false;
            }
        }
    }
};
