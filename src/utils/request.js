import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});


service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`;
  }
  return config;
}, err => {
  Promise.reject(err);
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
  Message.error(err.message);
  return Promise.reject(err);
});

export default service;