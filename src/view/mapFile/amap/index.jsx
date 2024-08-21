// 高德地图调研
import React, { useEffect, useState } from 'react';
import AMap from '@/common/map';
const url = 'https://a.amap.com/jsapi_demos/static/gltf-online/shanghai/scene.gltf';
// const url = require('../../static/file/SJKGDPr.gltf');

const AmapPage = () => {
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(17);
    // 改变缩放级别
    function changeZoom(type) {
        var z = map.getZoom();
        if (type === 'plus') {
            z++;
        } else {
            z--;
        }
        setZoom(z);
    }
    useEffect(() => {
        if (map) {
            // 同时引入工具条插件，比例尺插件和鹰眼插件
            AMap.plugin([
                'AMap.ToolBar',
                'AMap.Scale',
            ], function () {
                // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                map.addControl(new AMap.ToolBar());
                // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                map.addControl(new AMap.Scale());
            });
            // 创建Object3DLayer图层
            let object3DLayer = new AMap.Object3DLayer();
            map.add(object3DLayer);
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
                    gltf.setOption(option);
                    gltf.rotateX(90);
                    object3DLayer.add(gltf);  // 将加载glTF模型资源获得的glTF模型对象gltf添加到 object3Dlayer
                });
            });
        }
    }, [map]);

    useEffect(() => {
        if (map) {
            console.log(map.getLayers());
            AMap.event.addListener(map, 'zoomend', function () {
                let scale = 20 - map.getZoom();
                console.log(scale);
            });
        }
    }, [map]);
    // 初始化地图
    useEffect(() => {
        let _map = new AMap.Map('mapBox', {
            center: [101.922679, 31.792471],
            zoom: zoom,
            zooms: [3, 20],
            expandZoomRange: true, // 设置是否支持可以扩展最大缩放级别（pc:20,移动：高清19/非高清20），和zooms属性配合使用
            viewMode: '3D', // 3D视图
            showBuildingBlock: false,
            pitchEnable: false
        });
        setMap(_map);
    }, [zoom]);
    return <div className='ui_map_container_box' style={{ position: 'relative' }}>
        <div id='mapBox' className='mapbox' style={{ width: '100%', height: '100%', position: 'absolute' }}></div>
        {map && <div className='zoomBox'>
            <div className='addZoom zoomBtn' onClick={() => changeZoom('plus')}>+</div>
            <div>{zoom}</div>
            <div className='addZoom zoomBtn' onClick={() => changeZoom('less')}>-</div>
        </div>}
    </div>;
}
export default AmapPage;