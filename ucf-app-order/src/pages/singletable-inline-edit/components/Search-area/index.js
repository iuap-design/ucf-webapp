/**
 * A2行编辑搜索区域组件
 */

//React所需
import React, { Component } from 'react';
//状态管理
import { actions } from "mirrorx";
//Tinper-bee组件库
import { Col, Row, FormControl, Label } from "tinper-bee";
//表单
import Form from 'bee-form';
//下拉
import Select from 'bee-select';
//日期
import DatePicker from "tinper-bee/lib/Datepicker";
//日期本地化
import zhCN from "rc-calendar/lib/locale/zh_CN";

//加载工具类
import { deepClone } from "utils";
//部门参照组件
import { RefIuapDept } from 'components/RefViews';
//其他
import SearchPanel from 'components/SearchPanel';
import SelectMonth from 'components/SelectMonth';
import Alert from 'components/Alert';

//样式导入
import 'bee-datepicker/build/DatePicker.css';
import 'ref-tree/dist/index.css';

//所需变量
const { FormItem } = Form;
const { Option } = Select;
const format = "YYYY";
const { YearPicker } = DatePicker;


class SearchAreaForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    /** 执行查询方法回调
     * @param {array} error 校验是否成功
     * @param {json} values 表单数据
     */
    search = (error, values) => {
        let { status } = this.props;
        //针对不同数据进行处理
        if (values.year) {
            values.year = values.year.format('YYYY');
        }
        if (values.dept) {
            values.dept = JSON.parse(values.dept).refpk;
        }
        //检测是否为编辑查询
        if (status != 'view') {
            this.setState({
                show: true,
                values
            });
        } else {
            this.getQuery(values, 0);
        }
    }

    /**
     * 没退出编辑态后的查询确认
     *
     */
    onClickGo = () => {
        this.getQuery(this.state.values, 0);
        this.setState({ show: false });
        actions.inlineEdit.updateState({ status: 'view', rowEditStatus: true });
    }

    /**
     * 没退出编辑态后的取消
     *
     */
    onClickCancel = () => {
        this.setState({ show: false });
    }

    /**
     * 重置 如果无法清空，请手动清空
     *
     */
    reset = () => {
        // this.props.form.validateFields((err, values) => {
        //     this.getQuery(values, 1)
        // });
    }

    /**
     * 获取数据  type值为0查询，1为清空
     *
     * @param {array} values 要处理的值
     * @param {number} type 不同类型
     */
    getQuery = (values, type) => {
        let queryParam = deepClone(this.props.queryParam);
        let { pageParams, whereParams } = queryParam;

        whereParams = deepClone(whereParams);
        pageParams.pageIndex = 0;
        for (let key in values) {
            for (const [index, elem] of whereParams.entries()) {
                if (key === elem.key) {
                    whereParams.splice(index, 1);
                    break;
                }
            }
            if ((values[key] || values[key] === 0) && type === 0) {
                let condition = "LIKE";
                // 这里通过根据项目自己优化
                const equalArray = ["code", "month"];
                const greaterThanArray = ["serviceYearsCompany"];
                if (equalArray.includes(key)) { // 等于
                    condition = "EQ";
                }
                if (greaterThanArray.includes(key)) { // 大于等于
                    condition = "GTEQ";
                }
                whereParams.push({ key, value: values[key], condition }); //前后端约定
            }
        }

        queryParam.whereParams = whereParams;
        if (type === 0) { // 查询
            actions.inlineEdit.loadList(queryParam);
        }
        // actions.inlineEdit.updateState(queryParam);

    }


    render() {
        const { getFieldProps } = this.props.form;
        const { form, searchOpen, onCallback } = this.props;
        return (
            <SearchPanel
                className='edlin-form'
                form={form}
                searchOpen={searchOpen}
                reset={this.reset}
                onCallback={onCallback}
                search={this.search}>
                <Row>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>员工编号</Label>
                            <FormControl placeholder="精确查询" {...getFieldProps('code', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>员工姓名</Label>
                            <FormControl placeholder="模糊查询" {...getFieldProps('name', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem >
                            <Label>部门</Label>
                            <RefIuapDept {...getFieldProps('dept', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem className='time'>
                            <Label>年份</Label>
                            <YearPicker
                                {...getFieldProps('year', { initialValue: '' })}
                                format={format}
                                locale={zhCN}
                                placeholder="选择年"
                            />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>月份</Label>
                            <SelectMonth  {...getFieldProps('month', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>是否超标</Label>
                            <Select {...getFieldProps('exdeeds', { initialValue: '' })}>
                                <Option value="">请选择</Option>
                                <Option value="0">未超标</Option>
                                <Option value="1">超标</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Alert show={this.state.show} context="数据未保存，确定查询 ?" confirmFn={this.onClickGo} cancelFn={this.onClickCancel} />
            </SearchPanel>
        )
    }
}

export default Form.createForm()(SearchAreaForm)
