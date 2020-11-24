// openlayer 公共方法
import {
    Tile as TileLayer,
    Vector as VectorLayer
} from 'ol/layer'; // 图层
import {
    XYZ,
    Vector as VectorSource
} from 'ol/source';
import * as Proj from 'ol/proj';
import {
    Feature,
    Collection
} from 'ol'; // 地图Collection
import {
    Polygon
} from 'ol/geom'; // 用于回显Polygon
import {
    circular as circularPolygon
} from 'ol/geom/Polygon'; // 用于回显Circle

// openlayer 地图跳入位置(中心点坐标)动画
export function flyToFn(datas, zoomp, done, view) {
    let location = datas;
    let duration = 2000;
    let zoom = view.getZoom();
    let parts = 2;
    let called = false;

    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    }
    view.animate({
        center: location,
        duration: duration
    }, callback);
    view.animate({
        zoom: zoom - 1,
        duration: 1000
    }, {
        zoom: zoomp,
        duration: 1000
    }, callback);
}

// openlayer 贴高德地图图层
export function amapFn() {
    const Amap = new TileLayer({
        source: new XYZ({
            maxZoom: 20,
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&scl=1&size=1&style=7&x={x}&y={y}&z={z}'
        })
    });
    return Amap;
}

// 处理三维数组坐标 - 地理坐标转为投影坐标
export function handleThreeArr(arr) {
    let tempArrs = [];
    tempArrs = arr[0].map(item => {
        return Proj.transform(item, 'EPSG:4326', 'EPSG:3857');
    });
    return [tempArrs];
}

//- 投影坐标转地理坐标
export function handleThreeArr2(arr) {
    let tempArrs = [];
    tempArrs = arr[0].map(item => {
        return Proj.transform(item, 'EPSG:3857', 'EPSG:4326');
    });
    return [tempArrs];
}
//- 米转半径 默认转获取4326的 半径有type则为3857
export function getEPSGCoordinates(coordinates, radius, type) {
    let targetCenter = [];
    let targetRadius = 0;
    const currentCoor3857 = Proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857');
    const newCoor3857 = [currentCoor3857[0] + radius, currentCoor3857[1]];
    const newCoor4326 = Proj.transform(newCoor3857, 'EPSG:3857', 'EPSG:4326');

    if (type) {
        targetCenter = currentCoor3857;
        targetRadius = Math.abs(currentCoor3857[0] - newCoor3857[0]);
    } else {
        targetCenter = coordinates;
        targetRadius = Math.abs(newCoor4326[0] - coordinates[0]);
    }
    return {
        coordinates: targetCenter,
        radius: targetRadius
    };
}

//- 数字绘制多边形区域 points:坐标 datas:区域数据  areaStyle:样式, zIndex:层级, map当前地图
export function dropPolygonArea(points, areaStyle, nameData, zIndex, datas, map) {
    //- 创建一个Collection集合
    const features = new Collection();
    //- 创建多边形实例
    const polygon = new Polygon(points);
    //- 添加到Feature
    const feature = new Feature({
        geometry: polygon,
        name: nameData || 'noNameData',
        data: datas
    });
    features.push(feature);
    const polygonAreaLayer = new VectorLayer({
        style: areaStyle,
        source: new VectorSource({
            features: features
        })
    });
    polygonAreaLayer.setZIndex(zIndex);
    map.addLayer(polygonAreaLayer);
    return polygonAreaLayer;
}

// 数据绘制圆形区域 datas:区域数据  areaStyle:样式, nameData:区域的name属性 zIndex:层级,map当前地图
export function dropCircleArea(datas, areaStyle, nameData, zIndex, map) {
    //- 创建Collection集合
    const features = new Collection();
    let circle4326 = circularPolygon(datas.center, datas.radius, 64);
    let circle3857 = circle4326.clone().transform('EPSG:4326', 'EPSG:3857');
    const feature = new Feature({
        geometry: circle3857,
        name: nameData || 'noNameData',
        data: datas
    });
    features.push(feature);
    const clayer = new VectorLayer({
        style: areaStyle,
        source: new VectorSource({
            features: features
        })
    });
    clayer.setZIndex(zIndex);
    map.addLayer(clayer);
    return clayer;
}