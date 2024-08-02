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
                url: 'https://mister-ben.github.io/videojs-flvjs/bbb.flv',
                // url: 'http://172.16.3.10:80/rtp/340200000001110000111_34020000001360000009.flv',
                // url: 'http://172.16.3.10:18080/#/play/wasm/ws%3A%2F%2F172.16.3.10%3A80%2Frtp%2F340200000001110000111_34020000001360000009.flv',
                isLive: true, // 数据是否为直播流
                cors: true, // 是否启动跨域
                hasVideo: true, // 是否开启声音
                }, {
                    autoCleanupSourceBuffer: true, // 对SourceBuffer进行自动清理
                    autoCleanupMaxBackwardDuration: 12, // 当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清理
                    autoCleanupMinBackwardDuration: 8, // 指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位）。
                    enableStashBuffer: false, // 关闭IO隐藏缓冲区
                    isLive: true,
                    lazyLoad: false,
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
                flvRef.current.unload()
                flvRef.current.detachMediaElement()
                flvRef.current.destroy()
                flvRef.current = null;
            } else {
                flvRef.current.play();
            }
            setIsPlay(!isPlay);
        }
    }, [isPlay]);
    return <div className='ui_container_box'>
        视频流
        <video ref={videoRef} autoPlay controls></video>
        <div>
            {isPlay ? <PauseCircleFilled onClick={onClickPlay} /> : <PlayCircleFilled onClick={onClickPlay} />}
        </div>
    </div>;
}
export default FlvVideo;