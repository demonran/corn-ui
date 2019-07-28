import axios from 'axios';

let opt = {
  // baseURL: 'https://www.infish.cn/xwjErpApi', //https://www.infish.cn/xwjErpApi
  timeout: 10000, // http://192.168.1.53:8088
  headers: {'Content-Type':'application/json'} // 'application/x-www-form-urlencoded'
};
if (process && process.env.NODE_ENV === 'production') {
  opt.baseURL = '/api-yumimiao';
} else {
  opt.baseURL = '/api-yumimiao';
}

const http = axios.create(opt);

export default {
  async get (...params) {
    try {
      let ret = await http.get(...params);
      if (ret.status >= 200 && ret.status <= 300) {
        let data = ret.data;
        return {errorNo: data.statusCode ? data.statusCode : 200, result: data.data, errorDesc: data.errorMessage ? data.errorMessage : 'success'};
      }
      return {errorNo: ret.status, errorDesc: ret.statusText};
    } catch (error) {
      let status = 400;
      let desc = error.message;
      let response = error.response;
      if (response) {
        status = response.status;
        desc = JSON.stringify(response.data);
      }
      return {errorNo: status, errorDesc: desc};
    }
  },
  async post (url,data, options) {
    try {
      
      let dbid = localStorage.getItem('dbid');
      if( !options ) options = {headers:{}}
      
      options.headers['dbid'] = dbid;

      let ret = await http.post(url,data, options);

      if (ret.status >= 200 && ret.status <= 300) {
        let data = ret.data;
        return {errorNo: data.statusCode ? data.statusCode : 200, result: data.data, errorDesc: data.errorMessage ? data.errorMessage : 'success'};
      }
      return {errorNo: ret.status, errorDesc: ret.statusText};
    } catch (error) {
      let status = 400;
      let desc = error.message;
      let response = error.response;
      if (response) {
        status = response.status;
        desc = JSON.stringify(response.data);
      }
      return {errorNo: status, errorDesc: desc};
    }
  },
  async delete (...params) {
    try {
      let ret = await http.delete(...params);
      if (ret.status >= 200 && ret.status <= 300) {
        let data = ret.data;
        return {errorNo: data.statusCode ? data.statusCode : 200, result: data.data, errorDesc: data.errorMessage ? data.errorMessage : 'success'};
      }
      return {errorNo: ret.status, errorDesc: ret.statusText};
    } catch (error) {
      let status = 400;
      let desc = error.message;
      let response = error.response;
      if (response) {
        status = response.status;
        desc = JSON.stringify(response.data);
      }
      return {errorNo: status, errorDesc: desc};
    }
  }
};
