/**
 * 组织管理模块
 */

import React, { Component } from 'react';
import mirror, { actions } from 'mirrorx';
import { getHeight } from 'utils';
import { Loading } from 'tinper-bee';
import Grid from 'components/Grid';
import Header from 'components/Header';
import SearchArea from '../SearchArea';

import './index.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeight: 0
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
            title: "操作",
            dataIndex: "op",
            key: "op",
            width: 110,
            fixed:'left'
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 150
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
    render() {
        const _this = this;
        let { tableHeight } = _this.state;
        let { list, showLoading, pageIndex, totalPages, total, queryParam, pageSize } = _this.props;
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
                    pageSize={pageSize}
                    searchOpen={true}
                    onCallback={this.resetTableHeight}
                />
                <Grid
                    rowKey={'id'}//表格内使用的唯一key用于性能优化
                    columns={this.column}//定义列数据
                    paginationObj={paginationObj}//分页数据
                    data={list}//数据
                    getSelectedDataFunc={this.getSelectedDataFunc}//选择数据后的回调
                    scroll={{ y: tableHeight }}//固定表头
                />
                <Loading fullScreen={true} show={showLoading} loadingType="line" />
            </div>
        );
    }
}

export default Home;
