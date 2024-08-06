/**
 * openlayers overlay覆盖物
 * 模拟人员定位展示人员信息和查看人员详情弹窗
 */
import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Map, View, Feature } from 'ol'; // 地图Collection
import * as Proj from 'ol/proj'; // 转化
// import * as Coordinate from 'ol/coordinate';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'; // 图层
import { XYZ, Vector as VectorSource } from 'ol/source'; // 资源
import { Point } from 'ol/geom';
import { Style, Icon, Fill, Text } from 'ol/style'; // 样式
import Overlay from 'ol/Overlay'; // 弹框
import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition';
import helmetRed from '@/static/image/helmet_red@2x.png';
import helmetBlue from '@/static/image/helmet_blue@2x.png';
import helmetWhite from '@/static/image/helmet_white@2x.png';
import helmetYellow from '@/static/image/helmet_yellow@2x.png';
import helmetGray from '@/static/image/helmet_gray@2x.png';

let source;
let layer;
let overlay;

const OpenlayerOverlay = () => {
    const [map, setMap] = useState(null); // 地图
    const [view, setView] = useState(null); // 地图视图
    const [curInfo, setCurInfo] = useState(null); // 当前查看信息

    let personData = [
        {
            id: 1,
            name: '张三',
            position: [104.0641, 30.5973],
            color: 1,
            sex: 1
        },
        {
            id: 2,
            name: '李四',
            position: [104.0622, 30.5954],
            color: 2,
            sex: 2
        },
        {
            id: 3,
            name: '王五',
            position: [104.0722, 30.5960],
            color: 3,
            sex: 1
        },
        {
            id: 4,
            name: '张麻子',
            position: [104.0634, 30.5958],
            color: 4,
            sex: 1
        },
    ]

    // 设置feature样式
    function setFeatureStyle(feature, data) {
        if (data.color === 1) {
            feature.setStyle(
                new Style({
                    image: new Icon({
                        scale: 0.5,
                        src: helmetRed,
                        anchor: [0.5, 1]
                    })
                })
            );
        } else if (data.color === 2) {
            feature.setStyle(
                new Style({
                    image: new Icon({
                        scale: 0.5,
                        src: helmetBlue,
                        anchor: [0.5, 1]
                    })
                })
            );
        } else if (data.color === 3) {
            feature.setStyle(
                new Style({
                    image: new Icon({
                        scale: 0.5,
                        src: helmetWhite,
                        anchor: [0.5, 1]
                    })
                })
            );
        } else if (data.color === 4) {
            feature.setStyle(
                new Style({
                    image: new Icon({
                        scale: 0.5,
                        src: helmetYellow,
                        anchor: [0.5, 1]
                    })
                })
            );
        } else {
            feature.setStyle(
                new Style({
                    image: new Icon({
                        scale: 0.5,
                        src: helmetGray,
                        anchor: [0.5, 1]
                    })
                })
            );
        }
        feature.getStyle().setText(
            new Text({
                text: data.name, // 只能传入字符串
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
        );
    }
    // 关闭弹窗
    function closeOverlay() {
        overlay.setPosition(undefined);
        // overlay.getElement().style.display = 'none';
    }
    useEffect(() => {
        if (map) {
            // 创建一个弹窗 Overlay对象
            let overlayDom = document.getElementById('overlayBox');
            overlay = new Overlay({
                element: overlayDom,
                autoPan: true, // 弹出窗口在边缘点击时候显示不完整，设置自动平移效果
                positioning: 'center-center', // 根据position属性的位置来进行相对定位, 默认为top-left
                offset: [0, -120], // 偏移量，像素为单位，overlay 相对于放置位置（position）的偏移量，默认值是 [0, 0]，正值分别向右和向下偏移；
                stopEvent: true // 地图的事件传播是否停止，默认是 true，即阻止传播，可能不太好理解，举个例子，当鼠标滚轮在地图上滚动时，会触发地图缩放事件，如果在 overlay 之上滚动滚轮，并不会触发缩放事件，如果想鼠标在 overlay 之上也支持缩放，那么将该属性设置为 false 即可；
            });
            // 将弹窗添加到Map中
            map.addOverlay(overlay);

            // 添加交互行为
            let selectClick = new Select({
                condition: click, // 事件类型
                style: false, // 被选中后的样式  如果不写style，将为默认样式（不是自己设置的样式，而是opelayers自带的样式）,设置为false或者null将保持自己设置的样式
                // 指定图层
                filter: (feature, layer) => {
                    console.log(layer);
                    return layer;
                }
            });
            map.addInteraction(selectClick);

            selectClick.on("select", (e) => {
                if (e.selected.length > 0) {
                    // 获取当前点击要素信息
                    let clickPointInfo = e.selected[0].getProperties();
                    // 设置当前数据
                    setCurInfo(clickPointInfo);
                    // 设置弹出窗的位置为当前数据定位位置
                    overlay.setPosition(clickPointInfo.position);
                } else {
                    setCurInfo(null);
                    overlay.setPosition(undefined);
                }
            })

            // 监听鼠标点击
            // map.on('click', (evt) => {
            //     // 根据点位像素位置，获取此位置的要素feature
            //     const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            //         return feature;
            //     });
            //     if (feature) {
            //         // 获取要素的坐标
            //         const coordinates = feature.getGeometry().getCoordinates();
            //         // 获取当前点击要素的信息
            //         let clickPointInfo = feature.getProperties();
            //         // 设置当前点击点位数据
            //         setCurInfo(clickPointInfo);
            //         if (overlay) {
            //             // 设置弹出框的位置为点击的位置 
            //             overlay.setPosition(coordinates);
            //         }
            //     } else {
            //         // 如果没有点击到要素，隐藏弹出框
            //         overlay.setPosition(undefined);
            //         setCurInfo(null);
            //     }
            // });
        }
    }, [map]);

    useEffect(() => {
        if (map) {
            // 如果layer已经存在，就先删除，再绘制
            if (layer) {
                layer.getSource().clear();
                map.removeLayer(layer);
                layer = null;
            }
            // 根据position创建一个新的数据源和要素数组
            source = new VectorSource();
            for (let i = 0; i < personData.length; i++) {
                const item = personData[i];
                let feature = new Feature({
                    // ol.proj.fromLonLat用于将经纬度坐标从 WGS84 坐标系转换为地图投影坐标系
                    geometry: new Point(Proj.fromLonLat(item.position)),
                    id: item.id,
                    color: item.color,
                    sex: item.sex,
                    position: item.position,
                    name: item.name,
                    type: 'point'
                });
                // 设置feature样式
                setFeatureStyle(feature, item);
                source.addFeature(feature);
            }
            // 创建带有数据源的矢量图层
            layer = new VectorLayer({
                source: source,
                name: 'pointLayer'
            });
            // 将矢量图层添加到Map上
            map.addLayer(layer);
        }
    }, [map, personData]);

    // 地图鼠标样式调整
    useEffect(() => {
        if (map) {
            // 给地图绑定鼠标移动事件，检测鼠标位置所在是否存在feature来改变鼠标输入样式
            map.on('pointermove', (e) => {
                // 获取像素位置
                let pixel = map.getEventPixel(e.originalEvent);
                // 根据点位像素位置，获取此位置的要素feature
                let feature = map.forEachFeatureAtPixel(pixel, (featureOther) => {
                    return featureOther;
                });
                // 要素存在，并且是需要改变鼠标样式为pointer的feature，鼠标样式变为pointer，否则auto
                if (feature === undefined) {
                    map.getTargetElement().style.cursor = "auto";
                } else {
                    map.getTargetElement().style.cursor = "pointer";
                }
            });
        }
    }, [map]);

    useEffect(() => {
        // 监听地图视图，创建地图
        if (view) {
            // 使用高德图层
            const tileLayer = new TileLayer({
                source: new XYZ({
                    url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&scl=1&size=1&style=7&x={x}&y={y}&z={z}'
                }),
                name: 'mapLayer'
            });
            // 创建实例
            const _map = new Map({
                target: 'map',
                layers: [tileLayer], // 使用高德图层
                view: view
            });
            setMap(_map);
        }
    }, [view]);

    useEffect(() => {
        // View用于创建2D视图
        const viewObj = new View({
            // 设定中心点，因为默认坐标系为 3587，所以要将我们常用的经纬度坐标系4326 转换为 3587坐标系
            center: Proj.transform([104.06403453968424, 30.597419070782898], 'EPSG:4326', 'EPSG:3857'),
            zoom: 16
        });
        setView(viewObj);
    }, []);
    useEffect(() => {
        return () => {
            layer = null;
            source = null;
            // 删除Overlay
            // overlay.setMap(null);
            overlay = null;
            setMap(null);
            setView(null);
            setCurInfo(null);
        }
    }, []);

    return <div className='map_container'>
        <div id='map' style={{ width: '100%', height: '100%' }}></div>
        <div className='overlayBox' id='overlayBox'>
            {/* 关闭按钮 */}
            <CloseOutlined className="close" onClick={closeOverlay} />
            <div>姓名：{curInfo && curInfo.name}</div>
            <div>性别：{curInfo && curInfo.sex === 1 ? '男' : '女'}</div>
            <div>位置：{curInfo && curInfo.position[0]}, {curInfo && curInfo.position[1]}</div>
        </div>
    </div>;
}
export default OpenlayerOverlay;