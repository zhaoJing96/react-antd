/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'antd';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { getCanvasIntersects } from '@/common/three'; // three自定义公共方法
// 天空盒子环境贴图图片
const skyZ1 = require('@/static/image/sky/Sky_DayZ1.png');
const skyZ2 = require('@/static/image/sky/Sky_DayZ2.png');
const skyX1 = require('@/static/image/sky/Sky_DayX1.png');
const skyX2 = require('@/static/image/sky/Sky_DayX2.png');
const skyY1 = require('@/static/image/sky/Sky_DayY1.png');
const skyY2 = require('@/static/image/sky/Sky_DayY2.png');
const modelUrl = require('@/static/image/JC6BD.glb');

let renderer, scene, camera, composer, outlinePass;
let isComposer = false; // 是否组合渲染，现实选中高光效果
let delta = new THREE.Clock().getDelta();//getDelta()方法获得两帧的时间间隔

// three.js加载3D 模型glb
export default function GltfModelPage() {
    const [modelData, setModelData] = useState(null); // 模型对象
    const [modelColorsPosi, setModelColorsPosi] = useState(null); // 用于存储模型颜色位置
    const box = useRef(); // canvas盒子
    console.log(modelColorsPosi);
    // 设置天空盒子背景
    function setSceneBackground() {
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
    }
    // 设置灯光
    function setLight() {
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
    }
    // 加载模型、存储模型初始颜色等参数
    function setGltfModel() {
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
            scene.add(gltf.scene);
        });
    }
    // 设置模型高亮选中
    function setComposer(width, height) {
        // 设置高亮
        composer = new EffectComposer(renderer); // 配置composer
        let renderPass = new RenderPass(scene, camera); // 配置通道
        composer.addPass(renderPass); // 将通道加入composer
        outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
        outlinePass.visibleEdgeColor.set('#fff000'); // 选中颜色
        outlinePass.edgeStrength = 5; // 强度
        outlinePass.edgeGlow = 1.5; // 边缘明暗度
        outlinePass.renderToScreen = true; // 设置这个参数的目的是马上将当前的内容输出
        composer.addPass(outlinePass);
        composer.selectedObjectEffect = function (objs) {
            let selectedObjects = [];
            selectedObjects.push(objs);
            outlinePass.selectedObjects = selectedObjects;
        }
    }
    // 渲染动画
    function renderFn() {
        requestAnimationFrame(renderFn);
        if (isComposer) {
            // 组合渲染器，渲染高亮
            composer.render(delta);
        } else {
            // 用相机渲染一个场景
            renderer.render(scene, camera);
        }
    }
    // 指定模型子集改变颜色
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

    // 监听窗体变化、自适应窗体事件
    function onWindowResize() {
        let width = box.current.offsetWidth;
        let height = box.current.offsetHeight;
        camera.left = width / - 2;
        camera.right = width / 2;
        camera.top = height / 2;
        camera.bottom = height / -2;
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
            if (selectObj && selectObj.length > 0) {
                isComposer = true;
                composer.selectedObjectEffect(selectObj[0].object);
            } else {
                isComposer = false;
            }
        });
    }, []);

    // 初始化环境、灯光、相机、渲染器
    useEffect(() => {
        scene = new THREE.Scene();
        // 天空盒子
        setSceneBackground();
        // 添加光源
        setLight();
        // 加载模型
        setGltfModel();
        // 获取宽高设置相机和渲染区域大小
        let width = box.current.offsetWidth;
        let height = box.current.offsetHeight;
        let k = width / height;
        // 投影相机
        camera = new THREE.PerspectiveCamera(60, k, 0.1, 3000);
        camera.position.set(250, 500, 700);
        camera.lookAt(scene.position);

        // 创建一个webGL对象
        renderer = new THREE.WebGLRenderer({
            //增加下面两个属性，可以抗锯齿
            antialias: true,
            alpha: true
        });
        renderer.setSize(width, height); // 设置渲染区域尺寸
        renderer.setClearColor(0xffffff, 1); // 设置颜色透明度
        // 首先渲染器开启阴影
        renderer.shadowMap.enabled = true;
        box.current.appendChild(renderer.domElement);
        // 高亮设置
        setComposer(width, height);
        // 渲染
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