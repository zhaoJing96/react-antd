import React, { useEffect, useRef, useState } from 'react';

const JessibucaPlayer = () => {
    const [showOperateBtns, setShowOperateBtns] = useState(false); // 按钮显示
    const [isPlaying, setIsPlaying] = useState(false); // 是否在播放中
    const [player, setPlayer] = useState(null); // 播放器
    const container = useRef();

    useEffect(() => {
        let _container = container.current;
        let _player = new window.Jessibuca({
            container: _container,
            videoBuffer: 0.5, // 缓存时长
            hasAudio: true, // 是否有音频
            debug: false,
            isResize: false,
            isFlv: false,
            isNotMute: false, // 是否静音
            howBandwidth: showOperateBtns, // 显示网速
            operateBtns: {
                fullscreen: showOperateBtns, // 全屏按钮
                screenshot: showOperateBtns, // 截图按钮
                play: showOperateBtns, // 播放暂停按钮
                audio: showOperateBtns, // 声音按钮
            }, // 操作按钮
        });
        setPlayer(_player)
    }, [showOperateBtns]);
    // 播放
    function play() {
        if (player) {
            player.play('http://172.16.3.10:80/rtp/34020000001110000001_34020000001320000004.flv'); // 有音频的
            // player.play('http://172.16.3.10:80/rtp/34020000001110000001_34020000001320000001.flv');  // 移动的小监控
            // player.play('http://172.16.3.10:80/rtp/34020000001110000001_34020000001320000003.flv');  // 球星监控
            // player.play('ws://172.16.3.10:80/rtp/34020000001110000001_34020000001320000004.flv'); // 有音频的
            // player.play('ws://172.16.3.10:80/rtp/34020000001110000001_34020000001320000001.flv');  // 移动的小监控
            // player.play('ws://172.16.3.10:80/rtp/34020000001110000001_34020000001320000003.flv');  // 球星监控
            setShowOperateBtns(true);
            setIsPlaying(true);
        }
    }
    // 暂停
    function pause() {
        if (player) {
            player.pause();
            setIsPlaying(false)
        }
    }

    return <div className='ui_container_box'>
        <div ref={container} style={{ width: '800px', height: '500px' }}></div>
        {isPlaying ?
            <div onClick={pause}>暂停</div> :
            <div onClick={play}>播放</div>
        }
    </div>;
}
export default JessibucaPlayer;