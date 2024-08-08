/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const ThreeBSP = require('three-js-csg')(THREE);

const wall = require('@/static/image/wall.png');
let renderer, controls, scene, camera;

// three.js绘制圆形围栏，实际是空心圆柱体，通过圆柱体几何体CylinderGeometry + 三维模型运算ThreeBSP + 圆形几何体CircleGeometry实现
const Draw3DHollowCylinder = () => {
    const box = useRef(); // canvas盒子
    // 渲染动画
    function renderFn() {
        requestAnimationFrame(renderFn);
        // 用相机渲染一个场景
        renderer && renderer.render(scene, camera);
    }
    // 绘制空心圆柱体
    function draw() {
        const radius = 5; // 圆柱体半径
        const height = 3; // 圆柱体高度
        // 绘制两个圆柱体
        const smallCylinderGeom = new THREE.CylinderGeometry(radius - 0.1, radius - 0.1, height, 100, 10, false);
        const largeCylinderGeom = new THREE.CylinderGeometry(radius, radius, height, 100, 10, false);
        // ThreeBSP模型运算，将两个或者多个立方体通过模型交集（intersect）、差集（subtract）、并集（union）运算生成新的运算后立方体
        const smallCylinderBSP = new ThreeBSP(smallCylinderGeom);  //- 中心圆bsp对象
        const largeCylinderBSP = new ThreeBSP(largeCylinderGeom);   //- 外圈圆bsp对象
        // 获取两个圆柱体的差集
        const intersectionBSP = largeCylinderBSP.subtract(smallCylinderBSP);

        // 创建网格模型
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(wall);
        texture.wrapS = THREE.RepeatWrapping; // 水平方向如何包裹
        texture.wrapT = THREE.RepeatWrapping; // 垂直方向如何包裹
        // uv两个方向纹理重复数量、看板中重复数量
        texture.repeat.set(15, 1);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1
        });
        let hollowCylinder = intersectionBSP.toMesh(wireframeMaterial);  //- 添加样式

        //- 添加底座
        const geometry = new THREE.CircleGeometry(radius, 100);
        const material = new THREE.MeshBasicMaterial({
            color: 0xFF0018,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.1
        });
        const circle = new THREE.Mesh(geometry, material);
        circle.position.set(0, -height / 2, 0);
        circle.rotateX(Math.PI / 2);

        const group = new THREE.Group();
        group.name = 'fenceGroup';
        group.add(hollowCylinder);
        group.add(circle);
        // 添加到场景
        scene.add(group);
    }
    // 初始化环境、灯光、相机、渲染器
    useEffect(() => {
        scene = new THREE.Scene();
        // 添加光源
        const ambitlight = new THREE.AmbientLight(0x404040);
        scene.add(ambitlight)
        const sunlight = new THREE.DirectionalLight(0xffffff);
        sunlight.position.set(-20, 1, 1);
        scene.add(sunlight);
        // 绘制一个圆形电子围栏
        scene && draw();
        // 获取宽高设置相机和渲染区域大小
        const width = box.current.offsetWidth;
        let height = box.current.offsetHeight;
        let k = width / height;
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
    useEffect(() => {
        return () => {
            // 离开界面清除数据
            scene = null;
            camera = null;
            renderer = null;
            controls = null;
        }
    }, []);

    return <div className='ui_container_box'>
        three.js绘制3D空心圆柱体。
        <div style={{ width: '100%', height: 'calc(100% - 30px)' }} ref={box}></div>
    </div>;
}

export default Draw3DHollowCylinder;