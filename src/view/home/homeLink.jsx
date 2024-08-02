import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
const { SubMenu } = Menu;

export default function HomeLink() {
    return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <SubMenu key="components" title={<span>组件相关</span>}>
            <Menu.Item key="1">
                <Link to="/home/component" replace>
                    <span>日期、分页组件</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/home/tableResize" replace>
                    <span>表格头部固定</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/home/marquee" replace>
                    <span>文字滚动</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Link to="/home/tableDrag" replace>
                    <span>表格拖拽</span>
                </Link>
            </Menu.Item>
        </SubMenu>
        <SubMenu key="map" title={<span>地图相关</span>}>
            <Menu.Item key="amapGltf">
                <Link to="/home/amap" replace>
                    <span>高德地图贴图模型</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="openlayersCluster">
                <Link to="/home/openlayerCluster" replace>
                    <span>openlayer cluster 聚合</span>
                </Link>
            </Menu.Item>
        </SubMenu>
        <SubMenu
            key="8"
            title={<span>直播流相关</span>}>
            <Menu.Item key="flvVideo">
                <Link to="/home/flvVideo" replace>
                    <span>flvjs视频流</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="videojs">
                <Link to="/home/videoPlayer" replace>
                    <span>videojs视频流</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="jessibuca">
                <Link to="/home/jessibucaPlayer" replace>
                    <span>jessibuca H5直播流</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="h5splayer">
                <Link to="/home/h5sPlayer" replace>
                    <span>H5s视频</span>
                </Link>
            </Menu.Item>
        </SubMenu>
        <SubMenu key="3D" title={<span>3D模型相关</span>}>
            <Menu.Item key="gltfOne">
                <Link to="/home/gltfModel" replace>
                    <span>three.js加载3D模型</span>
                </Link>
            </Menu.Item>
        </SubMenu>
        <SubMenu
            key="react"
            title={<span>React hooks</span>}>
            <Menu.Item key="child1">
                <Link to="/home/hooks" replace>
                    <span>useContext、useReducer</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="child2">Option 10</Menu.Item>
            <Menu.Item key="child3">Option 11</Menu.Item>
            <Menu.Item key="child4">Option 12</Menu.Item>
        </SubMenu>
    </Menu>;
}