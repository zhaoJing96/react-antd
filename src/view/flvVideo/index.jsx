import React, { useCallback, useEffect, useRef, useState } from 'react';
import flvJs from 'flv.js';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

const FlvVideo = () => {
    const [isPlay, setIsPlay] = useState(false);
    const flvRef = useRef();
    const videoRef = useRef();
    
    useEffect(() => {
        // 查看当前浏览器是否支持flv.js，返回类型布尔值
        if (flvJs.isSupported()) {
            // 创建一个Palyer实例
            flvRef.current = flvJs.createPlayer({
                type: 'flv',  // flv 、MP4
                isLive: true, // 数据是否为直播流
                cors: true, // 是否启动跨域
                hasVideo: true,
                url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'
            })
        }
        if (videoRef.current) {
            flvRef.current.attachMediaElement(videoRef.current);
            flvRef.current.load();
        }
    }, []);
    // 播放暂停
    const onClickPlay = useCallback(() => {
        if (flvRef.current) {
            if (isPlay) {
                flvRef.current.pause();
            } else {
                flvRef.current.play();
            }
            setIsPlay(!isPlay);
        }
    }, [isPlay]);
    return <div className='ui_container_box'>
        视频流
        <video ref={videoRef}></video>
        <div>
            {isPlay ? <PauseCircleFilled onClick={onClickPlay} /> : <PlayCircleFilled onClick={onClickPlay} />}
        </div>
    </div>;
}
export default FlvVideo;