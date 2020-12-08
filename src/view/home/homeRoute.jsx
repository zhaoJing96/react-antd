import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import ComponentPage from '../componentPage/index.jsx';
import TableResize from '../tableResize/index.jsx';
import Marquee from '../marquee/index.jsx';
import TableDrag from '../tableDrag/index.jsx';
import OpenlayerCluster from '../openlayerCluster/index.jsx';
import HooksDemo from '../hooksDemo/index.jsx';
import GltfModelPage from '../gltfModel/index.jsx';

export default function HomeRoute() {
    return <Fragment>
        <Switch>
            {/* 默认页面 */}
            <Route exact path="/" component={ComponentPage}></Route>
            <Route exact path="/home" component={ComponentPage}></Route>
            <Route path="/home/component" component={ComponentPage}></Route>
            <Route path="/home/tableResize" component={TableResize}></Route>
            <Route path="/home/marquee" component={Marquee}></Route>
            <Route path="/home/tableDrag" component={TableDrag}></Route>
            <Route path="/home/openlayerCluster" component={OpenlayerCluster}></Route>
            <Route path="/home/hooks" component={HooksDemo}></Route>
            <Route path="/home/gltfModel" component={GltfModelPage}></Route>
        </Switch>
    </Fragment>;
}