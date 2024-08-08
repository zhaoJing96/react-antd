// openlayers点聚合
import React, { useState, useEffect } from 'react';
import { Map, View, Feature } from 'ol';// 地图Collection
import * as Proj from 'ol/proj'; // 转化
import { Vector as VectorSource, Cluster } from 'ol/source'; // 资源
import VectorLayer from 'ol/layer/Vector'; // 图层
import { Point } from 'ol/geom';
import { Style, Icon, Fill, Text } from 'ol/style'; // 样式
import { amapFn } from '@/common/util/openlayers.js';
const clusterImg = require('@/static/image/helmetMore.png');
const pointImg = require('@/static/image/helmet_blue@2x.png');

const OpenlayerMap = () => {
    const [map, setMap] = useState(null); // 地图
    const [view, setView] = useState(null); // 地图视图

    // 集群点样式，聚合后样式
    function setClusterStyle(feature) {
        // feature.get('features')这一步得到的是feature所在的集群的feature数组
        const features = feature.get('features');
        const name = feature.values_.features[0].values_.name; // 获取feature名称
        const size = features.length;
        let style;
        if (size > 1) {
            // 聚合样式
            style = new Style({
                image: new Icon({
                    scale: 0.5,
                    src: clusterImg,
                    anchor: [0.5, 1]
                }),
                text: new Text({
                    text: size.toString(), // 数字需要toString()转换
                    fill: new Fill({
                        color: '#FFFFFF'
                    }),
                    backgroundFill: new Fill({
                        color: '#555555'
                    }),
                    padding: [2, 2, 0, 4],
                    offsetY: -48,
                    scale: 1.4
                })
            });
        } else {
            // 单点样式
            style = new Style({
                image: new Icon({
                    scale: 0.5,
                    src: pointImg,
                    anchor: [0.5, 1]
                }),
                text: new Text({
                    text: name, // 数字需要toString()转换
                    fill: new Fill({
                        color: '#FFFFFF'
                    }),
                    backgroundFill: new Fill({
                        color: '#555555'
                    }),
                    padding: [2, 2, 0, 4],
                    offsetY: -48,
                    scale: 1.4
                })
            });
        }
        return style;
    }

    useEffect(() => {
        if (map) {
            // 散列点坐标
            let pointArr = [
                {
                    name: '张三',
                    position: [104.1005229950, 30.6743128087],
                }, {
                    name: '李四',
                    position: [103.9271879196, 30.7462617980],
                }, {
                    name: '王五',
                    position: [103.6227035522, 30.9932085864],
                }, {
                    name: '赵六',
                    position: [103.5752069950, 31.4663367378],
                }, {
                    name: '安娜',
                    position: [103.4307861328, 30.1941019446],
                }, {
                    name: '麻子',
                    position: [106.5885615349, 29.5679608922],
                }, {
                    name: '嘎子',
                    position: [106.4500522614, 29.5811456252],
                }, {
                    name: '翠花',
                    position: [107.7666950226, 29.4161988273],
                }
            ]
            // 散列点资源vector
            let source = new VectorSource();
            // 集群点按坐标生成对应feature
            for (let i = 0; i < pointArr.length; i++) {
                const item = pointArr[i];
                let feature = new Feature({
                    geometry: new Point(new Proj.fromLonLat(item.position)),
                    name: item.name,
                    type: 'point'
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
            // 设定中心点，因为默认坐标系为 3587，所以要将我们常用的经纬度坐标系4326 转换为 3587坐标系
            center: Proj.transform([103.9271879196, 30.7462617980], 'EPSG:4326', 'EPSG:3857'),
            zoom: 7
        });
        setView(viewObj);
    }, []);

    return <div id='map' style={{ width: '100%', height: '100%' }}></div>;
}
export default OpenlayerMap;