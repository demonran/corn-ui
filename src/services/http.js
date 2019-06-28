import axios from 'axios';

let opt = {
    // baseURL: 'https://www.infish.cn/xwjErpApi', //https://www.infish.cn/xwjErpApi
    timeout: 10000,//http://192.168.1.53:8088
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};
if( process && process.env.NODE_ENV == 'production')
{
    opt.baseURL = "https://www.infish.cn/xwjErpApi";
} else {
    opt.baseURL = "";
}

const http = axios.create(opt);
export default http;