import React, { useState, useEffect } from 'react';
import { Map, View, Feature } from 'ol';// 地图Collection
import * as Proj from 'ol/proj'; // 转化
import { Vector as VectorSource, Cluster } from 'ol/source'; // 资源
import VectorLayer from 'ol/layer/Vector'; // 图层
import { Point } from 'ol/geom';
import { Style, Circle, Stroke, Fill, Text } from 'ol/style'; // 样式
import { amapFn } from '@/common/util/openlayers.js';

const OpenlayerMap = () => {
    const [map, setMap] = useState(null); // 地图
    const [view, setView] = useState(null); // 地图视图

    // 集群点样式，聚合后样式
    function setClusterStyle(feature) {
        let features = feature.get('features'); // feature.get('features')这一步得到的是feature所在的集群的feature数组
        let size = features.length;
        let style = new Style({
            image: new Circle({
                radius: 18,
                stroke: new Stroke({
                    color: 'red'
                }),
                fill: new Fill({
                    color: 'red'
                })
            }),
            text: new Text({
                font: '15px sans-serif',
                text: size.toString(), // 数字需要toString()转换
                fill: new Fill({
                    color: '#fff'
                })
            })
        });
        return style;
    }

    useEffect(() => {
        if (map) {
            // 散列点坐标
            let pointArr = [
                [104.1005229950, 30.6743128087],
                [103.9271879196, 30.7462617980],
                [103.6227035522, 30.9932085864],
                [103.5752069950, 31.4663367378],
                [103.4307861328, 30.1941019446],
                [106.5885615349, 29.5679608922],
                [106.4500522614, 29.5811456252],
                [107.7666950226, 29.4161988273],
                [118.1862562895, 24.4891501310],
                [118.1982564926, 24.4947641146],
                [79.1592185000, 12.9721456000],
                [80.2164941000, 12.9914031000],
            ]
            // 散列点资源vector
            let source = new VectorSource();
            // 集群点按坐标生成对应feature
            for (let i = 0; i < pointArr.length; i++) {
                const item = pointArr[i];
                let feature = new Feature({
                    geometry: new Point(
                        new Proj.transform(item, 'EPSG:4326', 'EPSG:3857')
                    )
                });
                // 将散列点feature添加到散列点资源source中
                source.addFeature(feature);
            }
            // 创建集群资源
            let clusterSource = new Cluster({
                distance: 50,
                source: source
            });
            
            // 集群点图层
            let clusters = new VectorLayer({
                source: clusterSource,
                style: (feature) => {
                    return setClusterStyle(feature);
                }
            });
            map.addLayer(clusters);
        }
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
            center: Proj.transform([103.9271879196, 30.7462617980], 'EPSG:4326', 'EPSG:3857'),
            zoom: 5
        });
        setView(viewObj);
    }, []);

    return <div id='map' style={{ width: '100%', height: '100%' }}></div>;
}
export default OpenlayerMap;