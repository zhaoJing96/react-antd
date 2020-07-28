import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

export default function HomeLink() {
    return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
            <Link to="/home/onePage" replace>
                <span>nav 1</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="/home/twoPage" replace>
                <span>nav 2</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to="/home/threePage" replace>
                <span>nav 3</span>
            </Link>
        </Menu.Item>
        <Menu.Item key="4">
            <Link to="/home/fourPage" replace>
                <span>nav 4</span>
            </Link>
        </Menu.Item>
    </Menu>;
}