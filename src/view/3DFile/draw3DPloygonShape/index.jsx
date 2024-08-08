/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const wall = require('@/static/image/wall.png');
let renderer, controls, scene, camera;

// three.js绘制多边形围栏
const Draw3DHollowCylinder = () => {
    const box = useRef(); // canvas盒子
    // 渲染动画
    function renderFn() {
        requestAnimationFrame(renderFn);
        // 用相机渲染一个场景
        renderer.render(scene, camera);
    }
    /**
     * 绘制墙体
     * @param {墙体坐标点} params
     * @param {区域位于空间y轴位置} yHei
     * @param {几何图形组} group
     */
    function drawPloygonWall(params, yHei, group) {
        const wallHeight = 1; // 墙体高度
        // 长度
        const lens = Math.sqrt(Math.pow((Number(params.endZ) - Number(params.startZ)), 2) + Math.pow((Number(params.endX) - Number(params.startX)), 2));
        // 绘制网格模型，设置墙体样式
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(wall);
        texture.wrapS = THREE.RepeatWrapping; //水平方向如何包裹
        texture.wrapT = THREE.RepeatWrapping; // 垂直方向如何包裹
        // uv两个方向纹理重复数量、看板中重复数量
        texture.repeat.set(10, 1);
        // 设置偏移 纹理在单次重复时，从一开始将分别在U、V方向上偏移多少。 这个值的范围通常在0.0之间1.0
        texture.offset = new THREE.Vector2(0, 0);
        // 墙体参数 墙体高度1
        const box = new THREE.BoxGeometry(lens, wallHeight, 0);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1
        });
        const mesh = new THREE.Mesh(box, material);
        // 设置单面墙体位置
        const posx = (params.endX + params.startX) / 2;
        const posz = (params.endZ + params.startZ) / 2;
        mesh.position.set(posx, yHei + (wallHeight / 2), posz);
        // 设置墙体旋转角度
        const rotate = -Math.atan2((params.endZ - params.startZ), (params.endX - params.startX));
        mesh.rotation.y = rotate;
        // 将墙体添加到组中
        group.add(mesh);
    }
    useEffect(() => {
        if (scene) {
            const points = [
                [5, 0, 2],
                [8, 0, 2],
                [7, 0, 3],
                [6, 0, 3],
                [5, 0, 2]
            ];
            const pointArr = [];
            for (let i = 0; i < points.length; i++) {
                const item = points[i];
                pointArr.push(new THREE.Vector3(item[0], item[1], item[2]));
            }

            // 点绘制成线，再到二维平面
            const shape = new THREE.Shape();
            shape.moveTo(pointArr[0].x, pointArr[0].z);
            for (let i = 1; i < pointArr.length; i++) {
                shape.lineTo(pointArr[i].x, pointArr[i].z);
            }
            shape.autoClose = true; // 设置路径自动关闭

            // 从一个或多个路径形状中创建一个多边形几何体。
            const shapeGeometry = new THREE.ShapeGeometry(shape, 25);
            const shapeMaterial = new THREE.MeshBasicMaterial({
                color: 0xFF0018,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5
            });
            const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
            shapeMesh.rotateX(Math.PI / 2);

            const group = new THREE.Group();

            // 墙体数据处理
            const wallArr = [...pointArr];
            for (let i = 0; i < wallArr.length; i++) {
                if (i !== wallArr.length - 1) {
                    let params = {
                        startX: wallArr[i].x,
                        endX: wallArr[i + 1].x,
                        startZ: wallArr[i].z,
                        endZ: wallArr[i + 1].z
                    };
                    // 绘制墙体
                    drawPloygonWall(params, points[0][1], group);
                }
            }
            group.add(shapeMesh);
            scene.add(group);
        }
    }, [scene]);
    // 初始化环境、灯光、相机、渲染器
    useEffect(() => {
        scene = new THREE.Scene();
        // 添加光源
        const ambitlight = new THREE.AmbientLight(0x404040);
        scene.add(ambitlight)
        const sunlight = new THREE.DirectionalLight(0xffffff);
        sunlight.position.set(-20, 1, 1);
        scene.add(sunlight);
        const axisHelper = new THREE.AxesHelper();
        scene.add(axisHelper);//坐标辅助线加入到场景中

        // 获取宽高设置相机和渲染区域大小
        const width = box.current.offsetWidth;
        const height = box.current.offsetHeight;
        const k = width / height;
        // 投影相机
        camera = new THREE.PerspectiveCamera(75, k, 0.1, 1000);
        camera.position.set(1, 0, 25);
        camera.lookAt(scene.position);

        // 创建一个webGL对象
        renderer = new THREE.WebGLRenderer({
            //增加下面两个属性，可以抗锯齿
            antialias: true,
            alpha: true
        });
        renderer.setSize(width, height); // 设置渲染区域尺寸
        renderer.setClearColor(0x000000, 1); // 设置颜色透明度
        // 首先渲染器开启阴影
        renderer.shadowMap.enabled = true;
        box.current.appendChild(renderer.domElement);
        // 监听鼠标事件
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;//设置为true则启用阻尼(惯性)，默认false
        controls.dampingFactor = 0.05;//值越小阻尼效果越强
        // 渲染
        renderFn();
    }, []);

    return <div className='ui_container_box'>
        three.js绘制3D多边形区域。
        <div style={{ width: '100%', height: 'calc(100% - 30px)' }} ref={box}></div>
    </div>;
}

export default Draw3DHollowCylinder;