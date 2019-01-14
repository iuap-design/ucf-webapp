import { actions } from "mirrorx";
import * as api from "./service";

export default {
    // 确定 Store 中的数据模型作用域
    name: "app",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        list: [],//组织实体 ID、编码、名称
        showLoading: false,//加载Loading
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
            actions.app.updateState({ showLoading: true });
            let result = await api.getList(params);
            console.log(result)
            if (result.code == 200) {
                actions.app.updateState({
                    list: result.data,
                    showLoading: false
                });
            }
        }
    }
};
