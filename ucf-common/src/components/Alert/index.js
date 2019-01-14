import React, { Component } from 'react';
import PropTypes from "prop-types";
import PopDialog from 'components/Pop';
import './style.less';


const propTypes = {
    title: PropTypes.string,
    confirmFn: PropTypes.func,
    cancelFn: PropTypes.func,
    context: PropTypes.string,
    show: PropTypes.bool
};

const defaultProps = {
    title: "温馨提示",
    confirmFn: PropTypes.func,
    context: "确认要删除吗 ?",
    show: false
};

class AlertDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.show ? true : false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.show != nextProps.show) {
            this.setState({ show: nextProps.show })
        }
    }

    //确认回调函数
    confirmFn = () => {
        let { confirmFn } = this.props;
        // this.close();
        confirmFn && confirmFn();
    }

    //取消回调函数
    cancelFn = () => {
        let { cancelFn } = this.props;
        // this.close();
        cancelFn && cancelFn();

    }

    close = () => {
        this.setState({
            show: false
        })
    }

    render() {
        let { context, children } = this.props;
        //按钮组
        let btns = [
            {
                label: '确定',
                fun: this.confirmFn,
                icon: "uf-correct"
            },
            {
                label: '取消',
                fun: this.cancelFn,
                icon: "uf-back"
            }
        ];
        return (<span>
            <span className="alert-modal-title" onClick={() => { this.setState({ show: true }) }}>
                {children}
            </span>
            <PopDialog
                className="alert_dialog_modal" // 设置弹框样式
                show={this.state.show} //默认是否显示
                close={this.cancelFn}
                title={this.props.title}
                size="sm"
                titleIcon="uf-exc-t-o"
                btns={btns}>
                <span>{context}</span>
            </PopDialog>
        </span>)
    }
}

AlertDialog.propTypes = propTypes;
AlertDialog.defaultProps = defaultProps;
export default AlertDialog;
