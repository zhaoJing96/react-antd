import React from 'react';
import { Button } from 'antd';
import { useReducer } from 'react';
import { useContext } from 'react';
import { store, Context } from './state/store.js';
import reducer from './state/reducer.js';

// useContext、useReducer
export default function HooksDemo() {
    const [state, dispatch] = useReducer(reducer, store); // state 当前值，dispatch改变值得方法，reducer类似于(state, action) => newState，store 初始值
    function clearData() {
        dispatch({ type: 'clearData' });
    }
    return <Context.Provider value={state}>
        <div className='ui_container_box'>
            <span>定义Context对象初始化数据，使用React.createContext(数据)；</span><br />
            <span>使用useConext接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。</span><br />
            <span>当前的 context 值由上层组件中距离当前组件最近的'Context.Provider' 的 value prop 决定使用useContext获取</span><br />
            <span>使用useReducer获取值改变值</span><br /><br />

            <span>{state.name}：</span>
            <Button onClick={() => dispatch({ type: 'setName', name: 'ZJ' })}>设置姓名</Button>
            <span style={{ marginLeft: '16px' }}>{state.age}：</span>
            <Button onClick={() => dispatch({ type: 'setAge', age: 18 })}>设置年龄</Button>
            <Child1 />

            <br />
            <Button onClick={() => clearData()}>重置</Button>
        </div>
    </Context.Provider >;
}

function Child1() {
    const data = useContext(Context);
    return <div style={{ color: '#333', fontSize: '20px', marginTop: '30px' }}>
        {data.name}:
        <Child2 />
    </div>
}

function Child2() {
    const data = useContext(Context);
    return <span>{data.age}</span>
}