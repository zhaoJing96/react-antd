import React, { useState, useEffect } from 'react';
import { Map, View } from 'ol';// 地图Collection
// import { Map, View, Feature, Collection } from 'ol';// 地图Collection
import * as Proj from 'ol/proj'; // 转化
// import { amapFn } from '@/common/util/openlayers.js';
import { amapFn } from '../../common/util/openlayers.js';

const OpenlayerMap = () => {
    const [map, setMap] = useState(null); // 地图
    const [view, setView] = useState(null); // 地图视图

    // 使用高德地图图层
    // function amapFn() {
    //     const Amap = new TileLayer({
    //         source: new XYZ({
    //             maxZoom: 20,
    //             url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&scl=1&size=1&style=7&x={x}&y={y}&z={z}'
    //         })
    //     });
    //     return Amap;
    // }
    useEffect(() => {

    }, [map]);
    useEffect(() => {
        // 监听地图视图，创建地图
        if (view) {
            // 创建实例
            const _map = new Map({
                target: 'map',
                layers: [amapFn()], // 使用高德图层
                view: view
            });
            setMap(_map);
        }
    }, [view]);

    useEffect(() => {
        // View用于创建2D视图
        const viewObj = new View({
            center: Proj.transform([104.063311, 30.581168], 'EPSG:4326', 'EPSG:3857'),
            zoom: 17,
            projection: 'EPSG:3857'
        });
        setView(viewObj);
    }, []);

    return <div id='map' style={{ width: '100%', height: '100%' }}></div>;
}
export default OpenlayerMap;