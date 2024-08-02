import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
// import flvJs from 'flv.js';
// import "videojs-flvjs";
import "videojs-flvjs-es6";

const VideoPlayer = () => {
    const videoRef = useRef();
    const playerRef = useRef();

    useEffect(() => {
        // 确保播放器只初始化一次
        if (!playerRef.current) {
            const videoNode = videoRef.current;
            if (!videoNode) {
                return;
            }
            //判断是否全部下载完成
            const videoJsOptions = {
                autoplay: true, // 是否自动播放，默认false
                controls: true, // 是否显示控制条，默认true
                fluid: false, // 播放器适应容器大小
                preload: 'auto', // 自动加载
                muted: false, // 是否静音
                language: "zh-CN",
                notSupportedMessage: "此视频暂时无法播放,请稍后再试",
                techOrder: ['html5', 'flvjs'], //html5模式和flvjs模式
                flvjs: { //配置flv相关信息 如果播放flv才配置这个
                    mediaDataSource: {
                        isLive: true, //是否是直播
                        cors: true,//是否跨域
                        withCredentials: false,//是否跨站检测
                    },
                },
                sources: [{
                    // src: 'https://mister-ben.github.io/videojs-flvjs/bbb.flv',
                    // src: 'http://172.16.3.10:80/rtp/340200000001110000111_34020000001360000009.flv',
                    // src: 'http://172.16.3.10:18080/#/play/wasm/ws%3A%2F%2F172.16.3.10%3A80%2Frtp%2F340200000001110000111_34020000001360000009.flv',
                    src: 'http://172.16.3.10:80/rtp/340200000001110000111_34020000001360000009/hls.m3u8',
                    // type: 'video/x-flv'
                    type: 'application/x-mpegURL'
                }]
            }
            // 初始化video实例
            const player = playerRef.current = videojs(videoNode, videoJsOptions, () => {
                console.log('播放器准备完毕');
                // 
                player.on('waiting', () => {
                    console.log('player is waiting');
                });
                // 播放器销毁时
                player.on('dispose', () => {
                    console.log('player is dispose');
                });
                // player.play();
                player.on('ended', function () {
                    console.log('视频播放结束');
                });
            });
        }
    }, []);
    return <div className='ui_container_box'>
        <div className=' video-js vjs-default-skin vjs-big-play-centered'>
            <video ref={videoRef}></video>
        </div>
    </div>;
}
export default VideoPlayer;