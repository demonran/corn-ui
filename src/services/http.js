import axios from 'axios';
import patch from './httpPatch';

let opt = {
  // baseURL: 'https://www.infish.cn/xwjErpApi', //https://www.infish.cn/xwjErpApi
  timeout: 10000, // http://192.168.1.53:8088
  headers: {'Content-Type': 'application/json'}, // 'application/x-www-form-urlencoded'
  baseURL: '/api-yumimiao'
};

const http = axios.create(opt);

export default {
  get: patch(http, 'get'),
  post: patch(http, 'post'),
  delete: patch(http, 'delete'),
  put: patch(http, 'put')
};
