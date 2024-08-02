import React, { useState, useEffect } from 'react';
import Marquee from '../../component/marquee/index.jsx'

const MarqueePage = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        let lists = [{
            id: 1,
            value: '文字文字文字文字文字文字文字1'
        }, {
            id: 2,
            value: '文字文字文字文字文字文字文字2'
        }, {
            id: 3,
            value: '文字文字文字文字文字文字文字3'
        }];
        setList(lists);
    }, []);
    return <div className='ui_container_box'>
        <h1>文字纵向滚动</h1>
        <b>采用copy一个相同数据box div dom节点实现。定义滚动速度，每滚动一条数据停顿一段时间再次滚动</b><br />
        <span>1、可设置“<b>list</b>”定义滚动数据。</span><br />
        <span>2、可设置“<b>speed</b>”定义滚动速度，默认20。</span><br />
        <span>3、可设置“<b>delay</b>”定义间隔时间，默认1000ms</span><br />
        <span>4、可设置“<b>wid</b>”定义滚动区域宽度，默认100%，类型Number，单位px</span><br />
        <span>5、可设置“<b>hei</b>”定义滚动区域高度，默认30px，类型Number，单位px</span><br />
        <Marquee list={list} speed={20} delay={1000} wid={400} hei={32} />
    </div>;
}
export default MarqueePage;