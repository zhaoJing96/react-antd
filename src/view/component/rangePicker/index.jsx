import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
const { RangePicker } = DatePicker;

/**
 * 双日期组件
 * @params initDate, String,日期,设置初始化日期
 * @params style, String,组件样式
 * @params canSelectToday, String, 默认false, 判断能否选择今天，处理不可选择时间问题
 * @params isAddTime, String, 默认false, 返回参数是否添加时分秒
 * @callback,Function,函数参数,返回选择的日期
 * 用法如下:
 * <DRangePicker initDate={['2020-07-17','2020-07-17']} callback={(start,end) => {}} />
 * 注：如果本周日期为周一，默认选择上周
 */
export default function DRangePicker({ initDate, callback, style, canSelectToday, isAddTime, format }) {
    if (!callback) { throw new Error('缺少callback回调函数,将无法获取日期'); }
    const dateFormat = format || 'YYYY-MM-DD';
    // 获取当前日期
    const time = new Date();
    time.setDate(time.getDate() - 1);
    const curTimer = moment().day(moment().day() - 1).valueOf();
    const curDate = moment(time, dateFormat);

    let month = (time.getMonth() + 1) > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
    let day = time.getDate() > 9 ? time.getDate() : +'0' + time.getDate();
    const formatDate = time.getFullYear() + '-' + month + '-' + day;

    const [dateTime, setDateTime] = useState(null); // 时间
    // init
    useEffect(() => {
        // 设置初始值
        if (initDate) {
            setDateTime((initDate[0] && initDate[1]) ? [moment(initDate[0]), moment(initDate[1])] : null);
        } else {
            setDateTime(null);
        }
    }, [initDate]);
    // 选择日期
    function onStartEndDateChange(date, dateString) {
        let startTime = null;
        let endTime = null;
        if (isAddTime) {
            startTime = dateString[0] && dateString[0] !== '' ? dateString[0] + ' 00:00:00' : null;
        } else {
            startTime = dateString[0] && dateString[0] !== '' ? dateString[0] : null;
        }
        // 结束时间处理，不能大于当天
        let selectEndDate = moment(dateString[1]).valueOf();
        if (selectEndDate > curTimer) {
            if (isAddTime) {
                endTime = formatDate ? formatDate + ' 23:59:59' : null;
            } else {
                endTime = formatDate ? formatDate : null;
            }
            setDateTime([date[0], curDate]);
        } else {
            if (isAddTime) {
                endTime = dateString[1] && dateString[1] !== '' ? dateString[1] + ' 23:59:59' : null;
            } else {
                endTime = dateString[1] && dateString[1] !== '' ? dateString[1] : null;
            }
            setDateTime(date || null);
        }
        callback(startTime, endTime);
    }
    return <RangePicker
        format={dateFormat}
        value={dateTime}
        style={style}
        disabledDate={(current) => {
            if (canSelectToday === 1) {
                // 可以选择今天
                return current && current > moment().endOf('day');
            } else if (canSelectToday === 2) {
                return current && current > moment().day(moment().day() - 1).endOf('day');
            } else {
                return null
            }
        }}
        ranges={{
            '昨天': [moment().day(moment().day() - 1).startOf('day'), moment().day(moment().day() - 1).endOf('day')],
            '本周': moment().startOf('week').format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") ?
                [moment().week(moment().week() - 1).startOf('week'), moment().week(moment().week() - 1).endOf('week')] :
                [moment().startOf('week'), moment().day(moment().day() - 1)],
            '上一周': [moment().week(moment().week() - 1).startOf('week'), moment().week(moment().week() - 1).endOf('week')],
            '本月': [moment().startOf('month'), moment().day(moment().day() - 1)],
            '上个月': [moment().month(moment().month() - 1).startOf('month'), moment().month(moment().month() - 1).endOf('month')]
        }}
        onChange={onStartEndDateChange}
    />;
}