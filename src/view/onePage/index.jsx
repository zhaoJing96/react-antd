import React, { useState, useEffect } from 'react';
import DRangePicker from '../component/rangePicker/index.jsx'
import moment from 'moment';
import { Row, Col } from 'antd';

const OnePage = () => {
    const [date, setDate] = useState(null);

    // 设置默认时间昨天
    useEffect(() => {
        let start = moment().day(moment().day() - 1);
        let end = moment().day(moment().day() - 1);
        setDate([start, end])
    }, [])
    return <div className='ui_container_box'>
        <h1>页面1</h1>
        <Row>
            <Col span={24}>
                <div style={{ lineHeight: '25px' }}>
                    <b>双日期时间选择组件</b>：<br />
                    <span>1、可快速选择时间段（昨天、本周、上一周、本月、上一月）、或自定义选择时间段;</span><br />
                    <span>2、可设置“<b>initDate</b>”定义组件默认选中日期</span><br />
                    <span>3、可设置“<b>isAddTime</b>”定义返回时间格式是否包含时分秒</span><br />
                    <span>4、可设置“<b>canSelectToday</b>”定义能否选择未来时间，canSelectToday=1:不可选择未来时间（不可选时间不包含今天）；canSelectToday=2：不可选择未来时间且不可选择今天； canSelectToday=3：不限制所有时间都可选</span><br />
                    <span>5、可设置“<b>format</b>”定义时间格式，默认格式“YYYY-MM-DD”</span><br />
                    <span>6、可设置“<b>style</b>”定义组件样式</span><br />
                    <span>7、"<b>callback</b>"获取选择日期，两个参数 start:开始时间，end:结束时间</span><br />
                </div>
                <DRangePicker initDate={date} style={{ width: '320px' }} canSelectToday={1} callback={(start, end) => { }} />
            </Col>
        </Row>
    </div>;
}
export default OnePage;