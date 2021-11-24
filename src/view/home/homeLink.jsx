import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
const { SubMenu } = Menu;

export default function HomeLink() {
    return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
        <Menu.Item key="5">
            <Link to="/home/openlayerCluster" replace>
                <span>openlayer cluster 聚合</span>
            </Link>
        </Menu.Item>
        <SubMenu
            key="6"
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
        <Menu.Item key="7">
            <Link to="/home/gltfModel" replace>
                <span>three.js加载3D模型</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="8">
            <Link to="/home/amap" replace>
                <span>高德地图贴图模型</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="9">
            <Link to="/home/flvVideo" replace>
                <span>视频流</span>
            </Link>
        </Menu.Item>
    </Menu>;
}