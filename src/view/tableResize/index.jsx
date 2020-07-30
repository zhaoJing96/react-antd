/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react';
import { Table } from 'antd';

const TwoPage = () => {
    const [hei, setHei] = useState(0);
    // 高度改变事件
    const onResize = useCallback(() => {
        setHei(document.getElementById('box').offsetHeight);
    }, [])
    useEffect(() => {
        // 添加监听器
        window.addEventListener('resize', onResize);
        return (() => {
            window.removeEventListener('resize', onResize)
        })
    }, []);

    useEffect(() => {
        // 获取初始化高度
        setHei(document.getElementById('box').offsetHeight)
    }, []);

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '姓别',
            dataIndex: 'sex'
        },
        {
            title: '年龄',
            dataIndex: 'age'
        },
        {
            title: '手机号',
            dataIndex: 'phone'
        }
    ];
    const dataSource = [
        {
            id: 1,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 2,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 3,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 4,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 5,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 6,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 7,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 8,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 9,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 10,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 11,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 12,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 13,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 14,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 15,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 16,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 17,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 18,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 19,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 20,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 21,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 22,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 23,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 24,
            name: '张三',
            sex: '男',
            age: 10,
            phone: 12345678974
        }, {
            id: 25,
            name: '张三1111',
            sex: '男',
            age: 12222,
            phone: 12345678974
        }
    ]
    return <div className='ui_container_box'>
        <div className='ui_table_resize_box'>
            <h1>antd表格头部固定</h1>
            <div>表格头部固定，屏幕缩放自适应，获取屏幕变化div高度变化动态改变表格高度。</div>
            <div id='box' className='resize_box'>
                <Table dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    // 总高度-头部高度
                    scroll={{ y: hei - 55 }}
                    rowKey='id' />
            </div>
        </div>
    </div>;
}
export default TwoPage;