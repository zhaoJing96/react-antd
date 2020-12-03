import React from 'react';

// 初始化数据
export const store = {
    name: 'zj',
    age: 10
}

// 创建一个context对象
export const Context = React.createContext(store);