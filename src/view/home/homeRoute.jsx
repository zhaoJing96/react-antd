import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
// 组件相关
import ComponentPage from '@/view/componentFile/componentPage';
import TableResize from '@/view/componentFile/tableResize';
import Marquee from '@/view/componentFile/marquee';
import TableDrag from '@/view/componentFile/tableDrag';
// 地图相关
import AmapPage from '@/view/mapFile/amap';
import OpenlayerCluster from '@/view/mapFile/openlayerCluster';
import OpenlayerInteraction from '@/view/mapFile/openlayerInteraction';
import OpenlayerOverlay from '@/view/mapFile/openlayerOverlay';
// 直播流相关
import FlvVideo from '@/view/videoFile/flvVideo';
import VideoPlayer from '@/view/videoFile/videoPlayer';
import JessibucaPlayer from '@/view/videoFile/jessibucaPlayer';
import H5sPlayer from '@/view/videoFile/h5sPlayer'
// three.js相关
import InitModelPage from '@/view/3DFile/initModel';
import Draw3DHollowCylinder from '@/view/3DFile/draw3DHollowCylinder'
import Draw3DPloygonShape from '@/view/3DFile/draw3DPloygonShape'
import ModelInteractive from '@/view/3DFile/modelInteractive'
// react相关
import HooksDemo from '@/view/hooksDemo';

export default function HomeRoute() {
    return <Fragment>
        <Switch>
            {/* 默认页面 */}
            <Route exact path="/" component={ComponentPage}></Route>
            <Route exact path="/home" component={ComponentPage}></Route>
            {/* 组件相关 */}
            <Route path="/home/component" component={ComponentPage}></Route>
            <Route path="/home/tableResize" component={TableResize}></Route>
            <Route path="/home/marquee" component={Marquee}></Route>
            <Route path="/home/tableDrag" component={TableDrag}></Route>
            {/* 地图相关 */}
            <Route path="/home/amap" component={AmapPage}></Route>
            <Route path="/home/openlayerCluster" component={OpenlayerCluster}></Route>
            <Route path="/home/openlayerInteraction" component={OpenlayerInteraction}></Route>
            <Route path="/home/openlayerOverlay" component={OpenlayerOverlay}></Route>
            {/* 直播流相关 */}
            <Route path="/home/flvVideo" component={FlvVideo}></Route>
            <Route path="/home/videoPlayer" component={VideoPlayer}></Route>
            <Route path="/home/jessibucaPlayer" component={JessibucaPlayer}></Route>
            <Route path="/home/h5sPlayer" component={H5sPlayer}></Route>
            {/* three.js相关 */}
            <Route path="/home/draw3DHollowCylinder" component={Draw3DHollowCylinder}></Route>
            <Route path="/home/draw3DPloygonShape" component={Draw3DPloygonShape}></Route>
            <Route path="/home/initModel" component={InitModelPage}></Route>
            <Route path="/home/modelInteractive" component={ModelInteractive}></Route>
            {/* react相关 */}
            <Route path="/home/hooks" component={HooksDemo}></Route>
        </Switch>
    </Fragment>;
}