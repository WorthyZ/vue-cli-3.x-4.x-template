/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import Vue from 'vue'
import axios from 'axios';
import { message } from 'ant-design-vue'
// import Cookies from "vue-cookie";
// import router from '../router/router';
// import store from '../store/index';
// import qs from 'qs'

Vue.component(message)

/**
 * 跳转登录页
 * 携带当前页面路由，(用于在登录页面完成登录后返回当前页面)
 */
// const toLogin = () => {
//   router.replace({
//     path: '/login',
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   });
// }

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    // case 401:
    //   alert('请先登陆！');
    //   toLogin();
    //   break;
    // 403 token过期 清除token并跳转登录页
    // case 403:
    //   alert('登录过期，请重新登录');
    //   localStorage.removeItem('token');
    //   store.commit('setToken',null);
    //   setTimeout(() => {
    //     toLogin();
    //   }, 1000);
    //   break;
    // 404请求不存在
    case 404:
      message.error('请求的资源不存在')
      break;
    default:
      console.warn(other);
  }
}

// 创建axios实例
let instance = axios.create({
  timeout: 1000 * 12,
  // headers:{'Content-Type':'application/x-www-form-urlencoded'}
});
// 表示跨域请求时是否需要使用凭证
instance.defaults.withCredentials = true

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // post put patch 请求添加token
    if(config.method === 'post' || config.method === 'put' || config.method === 'patch' || config.method === 'delete'){
      config.headers = {
        // 'X-CSRFToken': Cookies.get('csrftoken')
      }
    }else {
      config.headers = {
        // 'content-type': 'text/plain;charset=UTF-8'
      }
    }
    // 用于判断用户登录情况
    // const token = store.state.token || localStorage.getItem('token');
    // token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.error(error));

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if(res.status === 200 || res.status === 201 || res.status === 202){
      // localStorage.setItem('token',res.data.body);
      // store.commit('setToken',res.data.body);
      return Promise.resolve(res);
    }else{
      return Promise.reject(res);
    }
  },
  // 请求失败
  error => {
    const {
      response
    } = error;
    console.log(error);
    if (response) {
      errorHandle(response.status, response.data.detail);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        // store.commit('changeNetwork', false);
      } else {
        return Promise.reject(error);
      }
    }
  });

// 导出
export default instance;
