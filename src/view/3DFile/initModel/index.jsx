/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getCanvasIntersects } from '@/common/three/index.js'; // three自定义公共方法
const modelUrl = require('@/static/file/RobotExpressive.glb');

let scene, camera, renderer, controls;

// three.js加载3D场景 模型glb
export default function InitModelPage() {
    const box = useRef(); // canvas盒子
    // 设置灯光
    function setLight() {
        //- 添加平行光光源
        let lightTop = new THREE.DirectionalLight(0xffffff, 0.3);
        let lightBottom = new THREE.DirectionalLight(0xffffff, 0.3);
        let lightLeft = new THREE.DirectionalLight(0xffffff, 0.6);
        let lightRight = new THREE.DirectionalLight(0xffffff, 0.6);
        let lightBefore = new THREE.DirectionalLight(0xffffff, 0.6);
        let lightAfter = new THREE.DirectionalLight(0xffffff, 0.6);
        lightTop.position.set(4, 6, 4);
        lightBottom.position.set(4, -6, 4);
        lightLeft.position.set(5, 6, 0);
        lightRight.position.set(-5, 6, 0);
        lightBefore.position.set(-1, -1, -1);
        lightAfter.position.set(1, -1, 1);
        scene.add(lightTop);
        scene.add(lightBottom);
        scene.add(lightLeft);
        scene.add(lightRight);
        scene.add(lightBefore);
        scene.add(lightAfter);
        // 光源开启阴影
        lightTop.castShadow = true;
        lightTop.shadow.mapSize = new THREE.Vector2(1024, 1024);
        lightTop.shadow.bias = -0.001;
    }
    // 加载模型
    function setGltfModel() {
        // 导入GlTF模型
        let gltfLoader = new GLTFLoader();
        gltfLoader.load(modelUrl, (gltf) => {
            gltf.scene.traverse(obj => {
                // 可操作模型
                if (obj.isMesh) {
                    if(obj.material.map){ // 判断是否存在贴图
                        console.log('.encoding', obj.material.map.encoding);
                    }
                }
            });
            scene.add(gltf.scene);
        });
    }
    // 渲染动画
    function renderFn() {
        requestAnimationFrame(renderFn);
        // 用相机渲染一个场景
        renderer && renderer.render(scene, camera);
    }
    // 监听窗体变化、自适应窗体事件
    function onWindowResize() {
        let width = box.current.offsetWidth;
        let height = box.current.offsetHeight;
        camera.aspect = width / height;
        // 更新相机投影矩阵，在相机任何参数被改变以后必须被调用
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    // 监听事件 窗体监听、点击事件监听
    useEffect(() => {
        // 监听窗体变化
        window.addEventListener('resize', onWindowResize, false);
        // 监听点击事件
        box.current.addEventListener('click', (event) => {
            let selectObj = getCanvasIntersects(event, box.current, camera, scene);
            console.log(selectObj);
        });
    }, []);

    // 初始化环境、灯光、相机、渲染器
    useEffect(() => {
        scene = new THREE.Scene();
        // 添加光源
        setLight();
        // 加载模型
        setGltfModel();

        let axisHelper = new THREE.AxesHelper();
        scene.add(axisHelper);//坐标辅助线加入到场景中

        // 获取宽高设置相机和渲染区域大小
        let width = box.current.offsetWidth;
        let height = box.current.offsetHeight;
        let k = width / height;
        // 投影相机
        camera = new THREE.PerspectiveCamera(45, k, 0.1, 3000);
        camera.position.set(5, 10, 25);
        camera.lookAt(scene.position);

        // 创建一个webGL对象
        renderer = new THREE.WebGLRenderer({
            //增加下面两个属性，可以抗锯齿
            antialias: true,
            alpha: true
        });
        renderer.setSize(width, height); // 设置渲染区域尺寸
        renderer.setClearColor(0x333333, 1); // 设置颜色透明度
        renderer.outputEncoding = THREE.sRGBEncoding; // 解决纹理贴图颜色偏差
        // 首先渲染器开启阴影
        renderer.shadowMap.enabled = true;
        box.current.appendChild(renderer.domElement);
        // 监听鼠标事件
        controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true;//设置为true则启用阻尼(惯性)，默认false
        // controls.dampingFactor = 0.05;//值越小阻尼效果越强
        // 渲染
        renderFn();
    }, []);
    useEffect(() => {
        return () => {
            // 清除数据
            scene = null;
            camera = null;
            renderer = null;
            controls = null;
        }
    }, []);

    return <div className='ui_container_box'>
        three.js 初始化场景，加载3D模型。
        <div style={{ width: '100%', height: 'calc(100% - 30px)' }} ref={box}></div>
    </div>;
}