import React, { useState, useEffect } from 'react';
import DragTable from '../component/dragTable/index.jsx';

const TableDrag = () => {
    const [dataSource, setDataSource] = useState([]);
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
    useEffect(() => {
        const data = [
            {
                id: 1,
                name: '张三',
                sex: '男',
                age: 10,
                phone: 12345678974
            }, {
                id: 2,
                name: '李四',
                sex: '男',
                age: 15,
                phone: 56789451234
            }, {
                id: 3,
                name: '王五',
                sex: '男',
                age: 46,
                phone: 12345678974
            }, {
                id: 4,
                name: '赵六',
                sex: '男',
                age: 60,
                phone: 12345678974
            }, {
                id: 5,
                name: '李七',
                sex: '男',
                age: 25,
                phone: 12345678974
            }
        ];
        setDataSource(data);
    }, []);
    return <div className='ui_container_box'>
        <h1>表格拖拽排序</h1>
        <b>使用ant Design 表格，结合react-dnd实现拖拽排序。</b><br />
        <span>1、可设置“<b>dataSource</b>”绑定表格数据。</span><br />
        <span>2、可设置“<b>columns</b>”定义表格列名。</span><br />
        <span>3、可通过“<b>setList</b>获取排序后数据。</span><br />
        <span>4、可设置ant design相关属性设置全选、滚动、样式等。</span><br />
        <DragTable dataSource={dataSource} columns={columns} rowKey='id' setList={setDataSource} />
    </div>;
}
export default TableDrag;