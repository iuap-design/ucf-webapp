/**
 * 入口、导入组件样式、渲染
 */

import React from 'react';
import { render } from 'mirrorx';
import App from "./container";

import 'tinper-bee/assets/tinper-bee.css';
// import 'ucf-common/styles/tinper-bee.css';
// import 'bee-table/build/Table.css';
// import 'ucf-common/styles/public.less';
// import './app.less';

render(<App />, document.querySelector("#app"));