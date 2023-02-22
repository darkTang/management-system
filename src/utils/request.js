import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});


service.interceptors.request.use(config => {
  return config;
}, err => {
  Promise.reject(err);
});

service.interceptors.response.use(res => {
  return res.data;
}, err => {
  return new Promise(() => { });
});

export default service;