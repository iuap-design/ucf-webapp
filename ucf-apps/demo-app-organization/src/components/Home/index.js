/**
 * 组织管理模块
 */

import React, { Component } from 'react';
import mirror, { actions } from 'mirrorx';
import { getHeight, Warning, Error, Info } from 'utils';
import { Loading, Icon } from 'tinper-bee';
import Grid from 'components/Grid';
import Header from 'components/Header';
import Button from 'components/Button';
import Alert from 'components/Alert';
import OrgModal from '../OrgModal';
import SearchArea from '../SearchArea';

import './index.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeight: 0,//动态计算表格高度
            showPop: false,//是否显示Pop
            btnFlag: 0,//新增0、修改1、查看2
            editModelVisible: false,//新增、编辑
            rowData: {},//修改的时候数据
        }
    }
    componentWillMount() {
        //计算表格滚动条高度
        this.resetTableHeight(true);
    }
    componentDidMount() {
        actions.app.loadList();
    }
    //定义Grid的Columns
    column = [
        {
            title: "操作区",
            dataIndex: "op",
            key: "op",
            width: 60,
            fixed: 'left',
            render: (text, record, index) => {
                return <div className="org-grid-operate">
                    <Icon onClick={() => this.handlerEdit(text, record, index)} type="uf-pencil-s" />
                </div>
            }
        },
        {
            title: "编码",
            dataIndex: "code",
            key: "code",
            width: 150
        },
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: 120
        }]
    /**
    * 重置表格高度计算回调
    *
    * @param {bool} isopen 是否展开
    */
    resetTableHeight = (isopen) => {
        let tableHeight = 0;
        if (isopen) {
            //展开的时候并且适配对应页面数值px
            tableHeight = getHeight() - 420
        } else {
            //收起的时候并且适配对应页面数值px
            tableHeight = getHeight() - 270
        }
        this.setState({ tableHeight });
    }

    /**
     * 添加组织数据（Modal）
     *
     */
    handlerAdd = () => {
        this.setState({
            editModelVisible: true,
            btnFlag: 0,
            rowData: {}
        });
    }

    /**
     * 操作栏内的编辑
     *
     * @param {string} text 该字段的值
     * @param {object} record 整行字段的记录
     * @param {number} index 当前行索引
     */
    handlerEdit = (text, record, index) => {
        this.setState({
            editModelVisible: true,
            btnFlag: 1,
            rowData: record
        });
    }

    /**
     *  批量删除组织数据（Modal）
     *
     */
    handlerDelete = () => {
        let { selectedList: deleteList } = this.props;
        if (deleteList.length > 0) {
            this.setState({ showPop: true });
        } else {
            Warning('请选择要删除的数据');
        }
    }

    /**
     * 选中后的checkbox
     *
     * @param {array} selected 选择后返回的选中项，包含_checked字段
     */
    getSelectedDataFunc = (selectedList) => {
        actions.app.updateState({ selectedList });
    }

    /**
     * 删除确认框的取消
     *
     */
    onClickPopCancel = () => {
        this.setState({ showPop: false });
    }

    /**
     * 确认删除开始发送请求给后端
     *
     */
    onClickPopDelete = async () => {
        this.setState({ showPop: false });
        let result = await actions.app.postDelete();
        if (result) {
            actions.app.loadList();
            Info('删除数据操作成功，已刷新');
        } else {
            Error('删除数据发生了错误');
        }
    }

    /**
     * 弹出信息框取消
     *
     */
    onClickModalClose = () => {
        this.setState({
            editModelVisible: false
        });
    }

    render() {
        const _this = this;
        let { tableHeight, showPop, editModelVisible, btnFlag, rowData } = _this.state;
        let { list, showLoading, pageIndex, totalPages, total, queryParam } = _this.props;
        //分页条数据
        const paginationObj = {
            activePage: pageIndex,//当前页
            total: total,//总条数
            items: totalPages,
            freshData: _this.freshData,//刷新数据
            onDataNumSelect: _this.onDataNumSelect,//选择记录行
        }
        return (
            <div className="home-wrap">
                <Header title='组织管理' />
                <SearchArea
                    queryParam={queryParam}
                    status={status}
                    searchOpen={true}
                    onCallback={this.resetTableHeight}
                />
                <div className="org-buttons">
                    <Button iconType="uf-plus" onClick={this.handlerAdd}>新增</Button>
                    <Button iconType="uf-del" onClick={this.handlerDelete}>删除</Button>
                    <Alert
                        show={showPop}
                        context="是否要删除 ?"
                        confirmFn={this.onClickPopDelete}
                        cancelFn={this.onClickPopCancel}
                    />
                </div>
                <Grid
                    className="org-grid"
                    rowKey={'id'}//表格内使用的唯一key用于性能优化
                    columns={this.column}//定义列数据
                    paginationObj={paginationObj}//分页数据
                    data={list}//数据
                    getSelectedDataFunc={this.getSelectedDataFunc}//选择数据后的回调
                    scroll={{ y: tableHeight }}//固定表头
                />
                <OrgModal
                    rowData={rowData}
                    close={this.onClickModalClose}
                    btnFlag={btnFlag}
                    editModelVisible={editModelVisible}
                />
                <Loading fullScreen={true} show={showLoading} loadingType="line" />
            </div>
        );
    }
}

export default Home;
