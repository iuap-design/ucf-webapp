/**
 * 入口、导入组件样式、渲染
 */

import React from 'react';
import { render } from 'mirrorx';
import { ConnectedHome } from "./container";

import 'tinper-bee/assets/tinper-bee.css';
import './app.less';

render(<ConnectedHome />, document.querySelector("#app"));