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
        pageIndex: 0,//分页条-当前页
        total: 0,//分页条-总记录数
        totalPages: 0,//
        queryParam: {},//总的查询对象

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
         * 按钮测试数据
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
         * 按钮测试数据
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
        }
    }
};
