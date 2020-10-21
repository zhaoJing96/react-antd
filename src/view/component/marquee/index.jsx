/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';

/**
 * 文字纵向滚动，采取copy div方式实现
 * @param {滚动数据} list 
 * @param {滚动速度} speed，默认速度20 
 * @param {停顿间隔时间} delay，默认间隔1000ms，单位ms
 * @param {滚动区域宽度} wid，滚动区域宽度，Number，单位px，默认100%
 * @param {滚动区域高度} wid，滚动区域高度，Number，单位px，默认30px
 */
function Marquee({ list, speed, delay, wid, hei }) {
    const marqueeWrapper = useRef();
    const marqueeBox = useRef();
    const marqueeCopyBox = useRef();
    useEffect(() => {
        const wrapper = marqueeWrapper.current;
        const box = marqueeBox.current;
        const copyBox = marqueeCopyBox.current;
        let time;
        let s = speed || 20;
        let d = delay || 1000;
        // 判断有数据才加载动画
        if (list && list.length === 0) {
            return;
        }
        // copy数据实现循环滚动
        copyBox.innerHTML = box.innerHTML;
        function marquee() {
            let h = hei ? hei : 30;
            if (wrapper.scrollTop % h === 0) {
                clearInterval(time);
                setTimeout(() => {
                    wrapper.scrollTop++;
                    time = setInterval(marquee, s);
                }, d);
            }
            if (copyBox.offsetHeight - wrapper.scrollTop <= 0) {
                // 初始循环处理
                wrapper.scrollTop -= box.offsetHeight;
            } else {
                wrapper.scrollTop++;
            }

        }
        time = setInterval(marquee, s);
        return () => {
            clearInterval(time);
        };
    }, [list]);
    return <div className='ui_warquee_scoll_box' ref={marqueeWrapper} style={{
        width: wid ? wid + 'px' : '100%',
        height: hei ? hei + 'px' : '30px',
        lineHeight: hei ? hei + 'px' : '30px'
    }}>
        <div className='child_box1' ref={marqueeBox} id='child_box1'>
            {
                (list && list.length > 0) ? list.map((item, index) => {
                    return <div className='li_box' style={{
                        height: hei ? hei + 'px' : '30px',
                        lineHeight: hei ? hei + 'px' : '30px'
                    }} key={index}>{item.value}</div>;
                }) : null
            }
        </div>
        <div className='child_box2' ref={marqueeCopyBox} id='child_box2'></div>
    </ div>;
}
export default Marquee;