/**
 * 搜索区组件
 */

//React所需
import React, { Component } from 'react';
//状态管理
import { actions } from "mirrorx";
//Tinper-bee组件库
import { Col, Row, FormControl, Label } from "tinper-bee";
//表单
import Form from 'bee-form';

//加载工具类
import { deepClone } from "utils";

//其他
import SearchPanel from 'components/SearchPanel';

import './index.less';

//所需变量
const { FormItem } = Form;

class SearchArea extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    /** 执行查询方法回调
     * @param {array} error 校验是否成功
     * @param {json} values 表单数据
     */
    search = (error, values) => {
        let queryParam = deepClone(this.props.queryParam);
        actions.app.updateState({ queryParam: Object.assign({}, queryParam, values) });
        actions.app.loadList({ ...queryParam, ...values });
    }

    /**
     * 重置 如果无法清空，请手动清空
     *
     */
    reset = () => {
        // actions.app.loadList();
    }


    render() {
        const { getFieldProps } = this.props.form;
        const { form, searchOpen, onCallback } = this.props;
        return (
            <SearchPanel
                className='search-area'
                form={form}
                searchOpen={searchOpen}
                reset={this.reset}
                onCallback={onCallback}
                search={this.search}>
                <Row>
                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>组织参照</Label>
                            <FormControl placeholder="组织参照" {...getFieldProps('ref', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>姓名</Label>
                            <FormControl placeholder="姓名查询" {...getFieldProps('name', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>手机号</Label>
                            <FormControl placeholder="手机号查询" {...getFieldProps('tel', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>邮箱</Label>
                            <FormControl placeholder="邮箱查询" {...getFieldProps('email', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    
                </Row>
            </SearchPanel>
        )
    }
}

SearchArea.displayName = 'SearchArea';
export default Form.createForm()(SearchArea)
