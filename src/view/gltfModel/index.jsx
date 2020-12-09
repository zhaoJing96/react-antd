/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'antd';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// 天空盒子环境贴图图片
const skyZ1 = require('@/static/image/sky/Sky_DayZ1.png');
const skyZ2 = require('@/static/image/sky/Sky_DayZ2.png');
const skyX1 = require('@/static/image/sky/Sky_DayX1.png');
const skyX2 = require('@/static/image/sky/Sky_DayX2.png');
const skyY1 = require('@/static/image/sky/Sky_DayY1.png');
const skyY2 = require('@/static/image/sky/Sky_DayY2.png');
const modelUrl = require('@/static/image/JC6BD.glb');

// three.js加载3D 模型glb
export default function GltfModelPage() {
    const [sceneObj, setSceneObj] = useState(null); // 场景对象
    const [cameraObj, setCameraObj] = useState(null); // 相机对象
    const [rendererObj, setRendererObj] = useState(null); // 渲染器对象
    const [modelData, setModelData] = useState(null); // 模型对象
    const [modelColorsPosi, setModelColorsPosi] = useState(null); // 用于存储模型颜色位置
    const box = useRef(); // canvas盒子
    console.log(modelColorsPosi);
    // 改变颜色
    function changeColor(e) {
        let target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() === 'li') {
            let color = target.getAttribute('color');
            let curColor = null;
            switch (color) {
                case 'red':
                    curColor = '#ff0000';
                    break;
                case 'blue':
                    curColor = '#0000ff';
                    break;
                case 'orange':
                    curColor = '#ff9900';
                    break;
                case 'white':
                    curColor = '#ffffff';
                    break;
                default:
            };
            if (modelData) {
                modelData.traverse(obj => {
                    if (obj.isMesh && obj.name === 'JC6BD_JC6WR_0') {
                        let newMaterial = obj.material.clone();
                        newMaterial.color = new THREE.Color(curColor);
                        obj.material = newMaterial;
                    }
                })
            }
        }
    }
    // 监听窗体变化
    function onWindowResize() {
        let width = box.current.offsetWidth;
        let height = box.current.offsetHeight;
        cameraObj.left = width / - 2;
        cameraObj.right = width / 2;
        cameraObj.top = height / 2;
        cameraObj.bottom = height / -2;
        // 更新相机投影矩阵，在相机任何参数被改变以后必须被调用
        cameraObj.updateProjectionMatrix();
        rendererObj.setSize(width, height);
    }
    useEffect(() => {
        if (sceneObj) {
            // 导入GlTF模型
            let gltfLoader = new GLTFLoader();
            gltfLoader.load(modelUrl, (gltf) => {
                gltf.scene.traverse(obj => {
                    // 模型Mesh开启阴影
                    if (obj.isMesh) {
                        obj.castShadow = true;
                        obj.receiveShadow = true;
                    }
                    // 存储模型小零件初始颜色、位置、名称
                    let modelObj = null;
                    let modelArr = [];
                    if (obj.isMesh) {
                        modelObj = {
                            name: obj.name,
                            color: obj.material.color,
                            posiX: obj.position.x,
                            posiY: obj.position.y,
                            posiZ: obj.position.z
                        }
                    }
                    modelArr.push(modelObj);
                    setModelColorsPosi(modelArr);
                });
                setModelData(gltf.scene);
                sceneObj.add(gltf.scene);
            });
        }
    }, [sceneObj]);

    useEffect(() => {
        if (cameraObj && rendererObj) {
            // 监听窗体变化
            window.addEventListener('resize', onWindowResize, false);
        }
    }, [cameraObj, rendererObj]);

    useEffect(() => {
        let scene = new THREE.Scene();
        // 创建一个环境、使用环境贴图
        let cubeTextureLoader = new THREE.CubeTextureLoader();
        let urls = [
            skyX1,
            skyX2,
            skyY1,
            skyY2,
            skyZ1,
            skyZ2
        ];
        let cubeTexture = cubeTextureLoader.load(urls);
        // 利用环境贴图设置场景背景
        scene.background = cubeTexture;
        setSceneObj(scene);

        // 添加光源
        let light = new THREE.AmbientLight(0xffffff);
        scene.add(light);
        // 平行光
        let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-4, 8, 4);
        scene.add(directionalLight);
        let directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight1.position.set(-4, 8, -4);
        scene.add(directionalLight1);
        // 光源开启阴影
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        directionalLight.shadow.bias = -0.001;

        // 获取宽高设置相机和渲染区域大小
        let width = box.current.offsetWidth;
        let height = box.current.offsetHeight;
        let k = width / height;
        // 投影相机
        let camera = new THREE.PerspectiveCamera(60, k, 0.1, 3000);
        camera.position.set(250, 500, 700);
        camera.lookAt(scene.position);
        setCameraObj(camera);

        // 创建一个webGL对象
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height); // 设置渲染区域尺寸
        renderer.setClearColor(0xffffff, 1); // 设置颜色透明度
        // 首先渲染器开启阴影
        renderer.shadowMap.enabled = true;
        box.current.appendChild(renderer.domElement);
        setRendererObj(renderer);

        // 渲染
        function renderFn() {
            // 用相机渲染一个场景
            renderer.render(scene, camera);
            requestAnimationFrame(renderFn);
        }
        renderFn();

        // 监听鼠标事件
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', renderFn);
    }, []);
    return <div className='ui_container_box'>
        three.js加载3D模型
        <div className='ui_model_container'>
            <ul onClick={changeColor}>
                <li color='red'></li>
                <li color='blue'></li>
                <li color='orange'></li>
                <li color='white'></li>
            </ul>
            <Button>分解模型</Button>
            <Button>合并模型</Button>
            <Button>重置颜色</Button>
            <Button>一键重置</Button>
        </div>
        <div style={{ width: '100%', height: '600px' }} ref={box}></div>
    </div>;
}