import axios from 'axios';

let opt = {
  // baseURL: 'https://www.infish.cn/xwjErpApi', //https://www.infish.cn/xwjErpApi
  timeout: 10000, // http://192.168.1.53:8088
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};
if (process && process.env.NODE_ENV === 'production') {
  // opt.baseURL = 'http://64.202.187.159:8081';
} else {
  opt.baseURL = '';
}

const http = axios.create(opt);

export default {
  async get (...params) {
    let ret = await http.get(...params);
    if (ret.status === 200) {
      let data = ret.data;
      return {errorNo: data.statusCode ? data.statusCode : 200, result: data.data, errorDesc: data.errorMessage ? data.errorMessage : 'success'};
    }
    return {errorNo: ret.status, errorDesc: ret.statusText};
  },
  async post (...params) {
    let ret = await http.post(...params);
    if (ret.status === 200) {
      let data = ret.data;
      return {errorNo: data.statusCode ? data.statusCode : 200, result: data.data, errorDesc: data.errorMessage ? data.errorMessage : 'success'};
    }
    return {errorNo: ret.status, errorDesc: ret.statusText};
  }
};
