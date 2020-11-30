import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

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
    </Menu>;
}