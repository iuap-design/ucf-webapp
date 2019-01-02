import React, { Component } from 'react';
import PropTypes from "prop-types";
import Modal from 'bee-modal';
import Icon from 'bee-icon';
import Button from 'components/Button';
import './style.less';

const ButtonBrand = Button;
const ButtonWarning = Button;
const ButtonDefaultAlpha = Button;
const ButtonDefaultLine = Button;

const defaultProps = {
  title: "",
  show: false,
  btns: [{ label: "", fun: null, className: "" }, { label: "", fun: null, className: "" }],   //设置操作按钮
  close: null,
  data: null,
  titleIcon: "",
  btnRender: null,
};

const propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  btns: PropTypes.array,
  close: PropTypes.func,
  data: PropTypes.object,
  titleIcon: PropTypes.string,
  btnRender: PropTypes.object,
};

class PopDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  close = () => {
    this.props.close && this.props.close();
  }

  btnClick = (e, da) => {
    let _data = this.props.data ? this.props.data : this;
    if (da.fun) {
      da.fun(_data)
    }
  }

  render() {
    let { titleIcon, btnRender } = this.props;
    let _btns = [], btn = 'btn';
    if (this.props.btns) {
      this.props.btns.map((da, i) => {
        let _button = null, icon = {};
        da.icon ? icon.iconType = da.icon : "";
        let _className = da.className ? da.className : null;
        let _defultAlphaButton = <ButtonDefaultLine key={"pop_btn" + i} {...icon} onClick={(e) => { this.btnClick(e, da) }} className={`${_className} ${btn}`} >{da.label}</ButtonDefaultLine>
        if (this.props.type == "delete") {
          _button = i === 0 ? <ButtonWarning key={"pop_btn" + i} {...icon} onClick={(e) => { this.btnClick(e, da) }} className={`${_className} ${btn}`} >{da.label}</ButtonWarning> : _defultAlphaButton;
        } else {
          _button = i === 0 ? <ButtonBrand {...icon} disabled={this.props.btnDisabled} key={"pop_btn" + i} onClick={(e) => { this.btnClick(e, da) }} className={`${_className} ${btn}`} >{da.label}</ButtonBrand> : _defultAlphaButton;
        }
        _btns.push(_button);
      })
    }


    return (
      <span>
        <span className="alert-modal-title" onClick={this.props.close}>
          {btnRender}
        </span>
        <Modal enforceFocus={false} className={(this.props.className ? this.props.className : "") + " pop_dialog "} size={this.props.size ? this.props.size : "lg"} backdrop={this.props.backdrop ? true : 'static'} show={this.props.show} onHide={this.props.close}  >
          <Modal.Header closeButton={true}>
            <Modal.Title>
              {titleIcon ? <Icon type={titleIcon} /> : null}
              {this.props.title}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="pop_dialog">
              {this.props.children}
            </div>

          </Modal.Body>

          <Modal.Footer className="pop_footer">
            {_btns}
          </Modal.Footer>
        </Modal>
      </span>)
  }
}

PopDialog.propTypes = propTypes;
PopDialog.defaultProps = defaultProps;
export default PopDialog;
