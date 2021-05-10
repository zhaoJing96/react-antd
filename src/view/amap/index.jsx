// 高德地图调研
import React, { useEffect, useState } from 'react';
import AMap from '@/common/map';
const url = 'https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf';
// const url = require('../../static/image/SJKGDPr.gltf');

const AmapPage = () => {
    const [map, setMap] = useState(null);
    useEffect(() => {
        if (map) {
            // 创建Object3DLayer图层
            let object3DLayer = new AMap.Object3DLayer();
            map.add(object3DLayer);
            console.log(map);
            // 加载AMap.GltfLoader插件
            map.plugin(["AMap.GltfLoader"], () => {
                let gltfObj = new AMap.GltfLoader();
                let option = {
                    position: new AMap.LngLat(101.922679, 31.792471),  // 必须,设置gltf模型位置
                    scale: 600,  // 非必须，设置模型缩放倍数
                    height: 0,  // 非必须，设置模型高度
                    scene: 0, // 非必须，设置当前场景序号
                }
                gltfObj.load(url, (gltf) => {
                    console.log(option);
                    gltf.setOption(option);
                    gltf.rotateX(90);
                    object3DLayer.add(gltf);  // 将加载glTF模型资源获得的glTF模型对象gltf添加到 object3Dlayer
                });
            });
        }
    }, [map]);
    // 初始化地图
    useEffect(() => {
        let _map = new AMap.Map('container', {
            center: [101.922679, 31.792471],
            zoom: 17,
            zooms: [3, 20],
            expandZoomRange: true, // 设置是否支持可以扩展最大缩放级别（pc:20,移动：高清19/非高清20），和zooms属性配合使用
            viewMode: '3D', // 3D视图
            showBuildingBlock: false,
            pitchEnable: false
        });
        setMap(_map);
    }, []);
    return <div id='container' className='ui_container_box'></div>;
}
export default AmapPage;