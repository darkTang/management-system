import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui';
import { getTimeStamp } from '@/utils/auth';
import router from '@/router';

const timeOut = 4800;     // 定义token有效时间7200s，客户端的主动介入

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});


service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (Date.now() - getTimeStamp() >= timeOut * 1000) {
      store.dispatch('user/logout');
      router.push('/login');
      return Promise.reject(new Error('token超时了'));
    } else {
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
  }
  return config;
}, err => {
  return Promise.reject(err);
});

service.interceptors.response.use(res => {
  const { success, message, data } = res.data;
  if (success) {
    // Message.success(message);
    return data;
  } else {
    Message.error(message);
    return Promise.reject(new Error(message || 'Error'));
  }
}, err => {
  // token失效，被动介入 401 unAuthorized
  if (err.response && err.response.data && err.response.data.code === 10002) {
    store.dispatch('user/logout');
    router.push('/login');
  }
  Message.error(err.message);
  return Promise.reject(err);
});

export default service;