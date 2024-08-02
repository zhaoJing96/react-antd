import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import ComponentPage from '../otherFile/componentPage';
import TableResize from '../otherFile/tableResize';
import Marquee from '../otherFile/marquee';
import TableDrag from '../otherFile/tableDrag';
import AmapPage from '../mapFile/amap';
import OpenlayerCluster from '../mapFile/openlayerCluster';
import GltfModelPage from '../3DFile/gltfModel';
import FlvVideo from '../videoFile/flvVideo';
import VideoPlayer from '../videoFile/videoPlayer';
import JessibucaPlayer from '../videoFile/jessibucaPlayer';
import H5sPlayer from '../videoFile/h5sPlayer'
import HooksDemo from '../hooksDemo';

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
            <Route path="/home/jessibucaPlayer" component={JessibucaPlayer}></Route>
            <Route path="/home/h5sPlayer" component={H5sPlayer}></Route>
        </Switch>
    </Fragment>;
}