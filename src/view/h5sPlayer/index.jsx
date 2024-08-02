import React, { useEffect, useRef, useState } from 'react';
import { H5sPlayerWS } from '@/static/js/h5splayer.js'

const H5sPlayer = () => {
    const [player, setPlayer] = useState(null); // 播放器
    const videoBox = useRef();
    const playpauseBox = useRef();

    useEffect(() => {
        let videoConf = {
            videoid: 'h5sVideo1',
            protocol: 'http', // 协议
            host: '192.168.10.195:18085', //端口
            rootpath: '/',
            hlsver: 'v1',
            token: '919e--1',
            session: 'a3b56ce5-493b-44ea-a579-2be6b6697bd2',
            consolelog: 'true'
        };
        let _player = new H5sPlayerWS(videoConf);
        setPlayer(_player);
    }, []);

    useEffect(() => {
        console.log(videoBox.current);
        if (player) {
            videoBox.current.play();
            player.connect();
        }
    }, [player]);
    useEffect(() => {
        return () => {
            if (player) {
                player.disconnect();
            }
        }
    }, [player]);

    return <div className='ui_container_box h5sContainer'>
        <video className="h5video" id="h5sVideo1" ref={videoBox} autoPlay playsInline></video>
        <div className="playpause" id="playpause" ref={playpauseBox}></div>
    </div>;
}
export default H5sPlayer;