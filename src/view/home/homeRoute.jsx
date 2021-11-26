import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import ComponentPage from '../componentPage';
import TableResize from '../tableResize';
import Marquee from '../marquee';
import TableDrag from '../tableDrag';
import OpenlayerCluster from '../openlayerCluster';
import HooksDemo from '../hooksDemo';
import GltfModelPage from '../gltfModel';
import AmapPage from '../amap';
import FlvVideo from '../flvVideo';
import VideoPlayer from '../videoPlayer';

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
            <Route path="/home/amap" component={AmapPage}></Route>
            <Route path="/home/flvVideo" component={FlvVideo}></Route>
            <Route path="/home/videoPlayer" component={VideoPlayer}></Route>
        </Switch>
    </Fragment>;
}