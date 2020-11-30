import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import ComponentPage from '../componentPage/index.jsx';
import TableResize from '../tableResize/index.jsx';
import Marquee from '../marquee/index.jsx';
import TableDrag from '../tableDrag/index.jsx';
import OpenlayerCluster from '../openlayerCluster/index.jsx';

export default function HomeRoute() {
    return <Fragment>
        <Switch>
            {/* 默认页面 */}
            <Route exact path="/home" component={ComponentPage}></Route>
            <Route path="/home/component" component={ComponentPage}></Route>
            <Route path="/home/tableResize" component={TableResize}></Route>
            <Route path="/home/marquee" component={Marquee}></Route>
            <Route path="/home/tableDrag" component={TableDrag}></Route>
            <Route path="/home/openlayerCluster" component={OpenlayerCluster}></Route>
        </Switch>
    </Fragment>;
}