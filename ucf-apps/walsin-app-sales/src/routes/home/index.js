import React, { Component } from 'react';
import { actions } from 'mirrorx';
import { Button } from 'tinper-bee';
import './index.less';

class Home extends Component {
    render() {
        return (
            <div className="home-wrap">
                <Button colors="info" onClick={() => actions.sales.loadData({ ucf: 'ucf' })}>Action</Button>
            </div>
        );
    }
}

export default Home;
