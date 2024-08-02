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
// GPS转高德
let GPS = {
    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,

    transformLat: function (x, y) {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon: function (x, y) {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    },
    // 坐标转换
    delta: function (lat, lon) {
        let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
        let dLat = this.transformLat(lon - 105.0, lat - 35.0);
        let dLon = this.transformLon(lon - 105.0, lat - 35.0);
        let radLat = lat / 180.0 * this.PI;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
        return { 'lat': dLat, 'lon': dLon };
    },
    // 判断是否为国外坐标
    outOfChina: function (lat, lon) {
        if (lon < 72.004 || lon > 137.8347) { return true; }
        if (lat < 0.8293 || lat > 55.8271) { return true; }
        return false;
    },
    // GPS---高德
    gcj_encrypt: function (wgsLat, wgsLon) {
        if (this.outOfChina(wgsLat, wgsLon)) { return { 'lat': wgsLat, 'lon': wgsLon }; }

        let d = this.delta(wgsLat, wgsLon);
        return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon };
    }
};
// 坐标处理-单个点
let gpsToPointTransform = function (gps) {
    let result = GPS.gcj_encrypt(gps[1], gps[0]);
    return [result.lon, result.lat];
};
// 坐标处理-多边形
let gpsToPolygonTransform = function (gps) {
    let final = [];
    let len = gps.length;
    for (let i = 0; i < len; i++) {
        let result = GPS.gcj_encrypt(gps[i][1], gps[i][0]);
        final.push([result.lon, result.lat]);
    }
    return final;
};
// 4326坐标下米转换成地图距离
let getRadius = (map, radius) => {
    let metersPerUnit = map.getView().getProjection().getMetersPerUnit();
    let circleRadius = radius / metersPerUnit;
    return circleRadius;
};
// 高德转GPS
let GD = {
    /****** 计算纬度******/
    CalLat: function (X, Y) {
        let ResultLat = -100.0 + 2.0 * X + 3.0 * Y + 0.2 * Y * Y + 0.1 * X * Y + 0.2 * Math.sqrt(Math.abs(X));
        ResultLat += (20.0 * Math.sin(6.0 * X * Math.PI) + 20.0 * Math.sin(2.0 * X * Math.PI)) * 2.0 / 3.0;
        ResultLat += (20.0 * Math.sin(Y * Math.PI) + 40.0 * Math.sin(Y / 3.0 * Math.PI)) * 2.0 / 3.0;
        ResultLat += (160.0 * Math.sin(Y / 12.0 * Math.PI) + 320 * Math.sin(Y * Math.PI / 30.0)) * 2.0 / 3.0;
        return ResultLat;
    },
    /******计算经度******/
    CalLon: function (X, Y) {
        let ResultLon = 300.0 + X + 2.0 * Y + 0.1 * X * X + 0.1 * X * Y + 0.1 * Math.sqrt(Math.abs(X));
        ResultLon += (20.0 * Math.sin(6.0 * X * Math.PI) + 20.0 * Math.sin(2.0 * X * Math.PI)) * 2.0 / 3.0;
        ResultLon += (20.0 * Math.sin(X * Math.PI) + 40.0 * Math.sin(X / 3.0 * Math.PI)) * 2.0 / 3.0;
        ResultLon += (150.0 * Math.sin(X / 12.0 * Math.PI) + 300.0 * Math.sin(X / 30.0 * Math.PI)) * 2.0 / 3.0;
        return ResultLon;
    },
    /******判断坐标是否在国外******/
    IsOutOfChina: function (Lon, Lat) {
        if (Lon < 72.004 || Lon > 137.8347) { return true; }
        if (Lat < 0.8293 || Lat > 55.8271) { return true; }
        return false;
    },
    /*********计算偏差***************/
    CalDev: function (WgLon, WgLat) {
        let ee = 0.00669342162296594323;
        let a = 6378245.0;
        if (this.IsOutOfChina(WgLon, WgLat)) { return { Lon: 0, Lat: 0 }; }
        let Lat = this.CalLat(WgLon - 105.0, WgLat - 35.0);
        let Lon = this.CalLon(WgLon - 105.0, WgLat - 35.0);
        let RadLat = WgLat / 180.0 * Math.PI;
        let Magic = Math.sin(RadLat);
        Magic = 1 - ee * Magic * Magic;
        let sqrtMagic = Math.sqrt(Magic);
        Lat = (Lat * 180.0) / ((a * (1 - ee)) / (Magic * sqrtMagic) * Math.PI);
        Lon = (Lon * 180.0) / (a / sqrtMagic * Math.cos(RadLat) * Math.PI);
        return { Lon: Lon, Lat: Lat };
    },
    /*********高德转GPS***************/
    GcjToWgs: function (Longitude, Latitude) {
        let Dev = this.CalDev(Longitude, Latitude);
        let RetLat = Latitude - Dev.Lat;
        let RetLon = Longitude - Dev.Lon;
        Dev = this.CalDev(RetLon, RetLat);
        RetLat = Latitude - Dev.Lat;
        RetLon = Longitude - Dev.Lon;
        return { Lon: RetLon, Lat: RetLat };
    }
};
// 坐标处理-单个点
let pointToGpsTransform = function (gd) {
    let result = GD.GcjToWgs(gd[0], gd[1]);
    return [result.Lon, result.Lat];
};
// 坐标处理-多边形
let polygonToGpsTransform = function (gd) {
    let final = [];
    let len = gd[0].length;
    for (let i = 0; i < len; i++) {
        let arr = Proj.transform(gd[0][i], 'EPSG:3857', 'EPSG:4326');
        let result = GD.GcjToWgs(arr[0], arr[1]);
        final.push([result.Lon, result.Lat]);
    }
    return final;
};
export { gpsToPointTransform, gpsToPolygonTransform, getRadius, pointToGpsTransform, polygonToGpsTransform };