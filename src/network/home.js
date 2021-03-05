/**
 *  home中所有的网络请求全部面向home.js发出，home.js中的请求全部面向request.js 
 *  以后所有的网络请求都是面向home.js发出的，避免一旦该网络请求axios不维护了，改的代码太多
 * */

import {request,request2} from './request';

// 首页中发送的多数据请求部分
export function getHomeMultiData() {  
  return request({
    url: '/home/multidata'
  });
}

// 首页中的流行新款精选部分的数据请求
export function getHomeGoods(type, page) {  
  return request2({
    url: '/home/data',
    params:{
      type,
      page
    }
  });
}

// 首页中的其他数据请求部分

/* totalArr=[];
arr1=[12,2,3,4,5];
// 将arr1数组中的内容全部放入totalArr中。可以使用遍历，可以使用解构
for(let num of arr1){
  totalArr.push(num);
}

// 使用解构语法
totalArr.push(...arr1); */
