import React from 'react';
import mirror, { render, Router } from 'mirrorx';
import Routes from './routes';

import 'tinper-bee/assets/tinper-bee.css';

import './app.less';

mirror.defaults({
    historyMode: "hash"
});

render(<Router>
    <Routes />
</Router>, document.querySelector("#app"));