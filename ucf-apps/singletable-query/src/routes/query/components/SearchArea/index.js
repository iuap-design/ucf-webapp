import { FormattedMessage, injectIntl } from 'react-intl';
import React, {Component} from 'react'
import {actions} from "mirrorx";
import { FormControl, Select, InputNumber} from "tinper-bee";
import FormList from 'components/FormList';
import DatePicker from "bee-datepicker";
// import {RefIuapDept} from 'components/RefViews';
import SearchPanel from 'components/SearchPanel';
import SelectMonth from 'components/SelectMonth';

import {deepClone, mergeListObj, delListObj} from "utils";
import { dateLocal } from 'components/Intl'

import './index.less'

const FormItem = FormList.Item;
const {Option} = Select;
const format = "YYYY";
const {YearPicker} = DatePicker;


class SearchAreaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = () => {
        this.props.form.validateFields((err, values) => {
            // 年份特殊处理
            if (values.year) {
                values.year = values.year.format('YYYY');
            }
            // 参照特殊处理
            const {dept} = values;
            if (dept) {
                const {refpk} = JSON.parse(dept);
                values.dept = refpk;
            }

            let queryParam = deepClone(this.props.queryParam);
            let {pageParams} = queryParam;
            pageParams.pageIndex = 0;

            const arrayNew = this.getSearchPanel(values); //对搜索条件拼接
            // queryParam.whereParams = mergeListObj(whereParams, arrayNew, "key"); //合并对象

            queryParam.whereParams=arrayNew;

            actions.query.updateState({cacheFilter: arrayNew});  //缓存查询条件
            actions.query.loadList(queryParam);
            this.props.clearRowFilter()
        });


    }


    /**
     * 重置 如果无法清空，请手动清空
     */
    reset = () => {
        this.props.form.resetFields();
        this.props.form.validateFields((err, values) => {
            let queryParam = deepClone(this.props.queryParam);
            let {whereParams} = queryParam;

            const arrayNew = [];
            for (const field in values) {
                arrayNew.push({key: field});
            }
            queryParam.whereParams = delListObj(whereParams, arrayNew, "key"); //合并对象
            actions.query.updateState({queryParam});  //清空查询条件
        });
    }


    /**
     *
     * @param values search 表单值
     * @returns {Array}
     */

    getSearchPanel = (values) => {
        const list = [];
        for (let key in values) {

            if (values[key] || ((typeof values[key]) === "number")) {
                let condition = "LIKE";
                // 这里通过根据项目自己优化
                const equalArray = ["code", "month"]; // 当前字段查询条件为等于
                const greaterThanArray = ["serviceYearsCompany"]; //  当前字段查询条件为大于等于
                if (equalArray.includes(key)) { // 查询条件为 等于
                    condition = "EQ";
                }
                if (greaterThanArray.includes(key)) { // 查询条件为 大于等于
                    condition = "GTEQ";
                }
                list.push({key, value: values[key], condition}); //前后端约定
            }
        }
        return list;

    }


    render() {
        const _this = this;
        const {form,onCallback} = _this.props;
        const {getFieldProps} = form;
        return (
            <SearchPanel
                reset={this.reset}
                onCallback={onCallback}
                search={this.search}
                intl={this.props.intl}
            >
                <FormList size="sm">
                    <FormItem
                        label={<FormattedMessage id="js.com.Sea5.0001" defaultMessage="员工编号" />}
                    >
                        <FormControl placeholder={this.props.intl.formatMessage({id:"js.com.Sea5.0002", defaultMessage:"精确查询"})} {...getFieldProps('code', {initialValue: ''})}/>
                    </FormItem>

                    <FormItem
                        label={<FormattedMessage id="js.com.Sea5.0003" defaultMessage="员工姓名" />}
                    >
                        <FormControl placeholder={this.props.intl.formatMessage({id:"js.com.Sea5.0004", defaultMessage:"模糊查询"})} {...getFieldProps('name', {initialValue: ''})}/>
                    </FormItem>

                    {/* <FormItem
                        label={<FormattedMessage id="js.com.Sea5.0005" defaultMessage="部门" />}
                    >
                        <RefIuapDept {...getFieldProps('dept', {initialValue: ''})}/>
                    </FormItem> */}

                    <FormItem
                        label={<FormattedMessage id="js.com.Sea5.0006" defaultMessage="司龄" />}
                    >
                        <InputNumber
                            min={0}
                            iconStyle="one"
                            {...getFieldProps('serviceYearsCompany', {initialValue: "",})}
                        />
                    </FormItem>

                    <FormItem
                        label={<FormattedMessage id="js.com.Sea5.0007" defaultMessage="年份" />}
                    >
                        <YearPicker
                            {...getFieldProps('year', {initialValue: null})}
                            format={format}
                            locale={dateLocal}
                            placeholder={this.props.intl.formatMessage({id:"js.com.Sea5.0008", defaultMessage:"选择年"})}
                        />
                    </FormItem>

                    <FormItem
                        label={<FormattedMessage id="js.com.Sea5.0009" defaultMessage="月份" />}
                    >
                        <SelectMonth {...getFieldProps('month', {initialValue: ''})} />
                    </FormItem>

                    <FormItem
                        label={<FormattedMessage id="js.com.Sea5.0010" defaultMessage="是否超标" />}
                    >
                        <Select {...getFieldProps('exdeeds', {initialValue: ''})}>
                            <Option value=""><FormattedMessage id="js.com.Sea5.0011" defaultMessage="请选择" /></Option>
                            <Option value="0"><FormattedMessage id="js.com.Sea5.0012" defaultMessage="未超标" /></Option>
                            <Option value="1"><FormattedMessage id="js.com.Sea5.0013" defaultMessage="超标" /></Option>
                        </Select>
                    </FormItem>
                </FormList>


            </SearchPanel>
        )
    }
}

export default FormList.createForm()(injectIntl(SearchAreaForm))
