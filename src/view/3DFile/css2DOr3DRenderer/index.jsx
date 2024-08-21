/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// 引入CSS2渲染器CSS2DRenderer和CSS2模型对象CSS2DObject
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
// 引入CSS3渲染器CSS3DRenderer和CSS3模型对象CSS3DObject
import { CSS3DObject, CSS3DSprite, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { getCanvasIntersects } from '@/common/three/index.js'; // three自定义公共方法
const modelUrl = require('@/static/file/SJKA1.glb');

let scene, camera, renderer, css2Renderer, css3Renderer, controls, tag;

// three.js加载3D场景 模型glb
export default function Css2DOr3DRenderer() {
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
            // create2DTag(gltf.scene);
            create3DTag(gltf.scene);
            scene.add(gltf.scene);
        });
    }
    // 添加2D标签
    function create2DTag(modelObj) {
        // 添加标签
        if (!tag) {
            const tagDom = document.getElementById('tag');
            // HTML元素转化为threejs的CSS2模型对象
            tag = new CSS2DObject(tagDom);
            tag.name = 'tag';
            tag.position.y = 100;
        }
        if (modelObj.getObjectByName('tag')) {
            return;
        } else {
            modelObj.add(tag);
        }
    }
    // 添加3D标签
    function create3DTag(modelObj) {
        // 添加标签
        if (!tag) {
            const tagDom = document.getElementById('tag');
            // 避免标签遮挡canvas鼠标事件
            tagDom.style.pointerEvents = 'none';
            // HTML元素转化为threejs的CSS3模型对象
            tag = new CSS3DSprite(tagDom);
            // tag = new CSS3DObject(tagDom);
            tag.name = 'tag';
            tag.position.y += 10;
            tag.scale.set(0.5, 0.5, 1); // 缩放标签尺寸
        }
        // 避免重复添加
        if (modelObj.getObjectByName('tag')) {
            return;
        } else {
            modelObj.add(tag);
        }
    }
    // 关闭
    function closeEventInfo() {
        // 获取标签对象
        let tagObj = scene.getObjectByName('tag'); 
        if (tagObj) { 
            let tagParent = tagObj.parent; 
            // 将标签从父元素中移除 
            tagParent.remove(tagObj); 
        }
    }
    // 渲染动画
    function renderFn() {
        requestAnimationFrame(renderFn);
        controls.update();
        // 用相机渲染一个场景
        renderer && renderer.render(scene, camera);
        // css2Renderer && css2Renderer.render(scene, camera);
        css3Renderer && css3Renderer.render(scene, camera);
    }
    // 监听窗体变化、自适应窗体事件
    function onWindowResize() {
        let width = box.current.offsetWidth;
        let height = box.current.offsetHeight;
        camera.aspect = width / height;
        // 更新相机投影矩阵，在相机任何参数被改变以后必须被调用
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        // css2Renderer.setSize(width, height); // 设置css2D渲染区域尺寸
        css3Renderer.setSize(width, height); // 设置css3D渲染区域尺寸
    }
    // 监听事件 窗体监听、点击事件监听
    useEffect(() => {
        // 监听窗体变化
        window.addEventListener('resize', onWindowResize, false);
        // 监听点击事件
        box.current.addEventListener('click', (event) => {
            let selectObj = getCanvasIntersects(event, box.current, camera, scene);
            if (selectObj[0]) {
                let modelObj = selectObj[0].object.parent;
                create2DTag(modelObj);
                // create3DTag(modelObj);
            } else {
                closeEventInfo();
            }
        }, false);
    }, []);

    // 初始化环境、灯光、相机、渲染器
    useEffect(() => {
        scene = new THREE.Scene();
        // 添加光源
        setLight();
        // 加载模型
        setGltfModel();
        let axisHelper = new THREE.AxesHelper(100);
        scene.add(axisHelper); // 坐标辅助线加入到场景中

        // 获取宽高设置相机和渲染区域大小
        let width = box.current.offsetWidth;
        let height = box.current.offsetHeight;
        let k = width / height;
        // 投影相机
        camera = new THREE.PerspectiveCamera(45, k, 1, 100000);
        camera.position.set(32, 122, 580);
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
        box.current.appendChild(renderer.domElement);

        // css2Renderer = new CSS2DRenderer();
        // css2Renderer.setSize(width, height);
        // css2Renderer.domElement.style.position = 'absolute';
        // css2Renderer.domElement.style.top = '0px';
        // css2Renderer.domElement.style.pointerEvents = 'none';
        // box.current.appendChild(css2Renderer.domElement);

        css3Renderer = new CSS3DRenderer();
        css3Renderer.setSize(width, height);
        css3Renderer.domElement.style.position = 'absolute';
        css3Renderer.domElement.style.top = '0px';
        css3Renderer.domElement.style.pointerEvents = 'none';
        box.current.appendChild(css3Renderer.domElement);

        // 监听鼠标事件
        controls = new OrbitControls(camera, renderer.domElement);
        // 渲染
        renderFn();
    }, []);
    useEffect(() => {
        return () => {
            // 清除数据
            scene = null;
            camera = null;
            renderer = null;
            css2Renderer = null;
            css3Renderer = null;
            controls = null;
            tag = null;
        }
    }, []);

    return <div className='ui_container_box'>
        three.js 2D、3D渲染器demo。
        <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 30px)' }} ref={box}></div>
        <div id='tag' style={{ background: '#FFFFFF', display: 'none' }}>
            <span>标签内容</span>
            <span className='close' style={{ pointerEvents: 'auto' }} onClick={closeEventInfo}>×</span>
        </div>
    </div >;
}