import axios from 'axios';
import qs  from 'qs';

let opt = {
    // baseURL: 'https://www.infish.cn/xwjErpApi', //https://www.infish.cn/xwjErpApi
    timeout: 10000,//http://192.168.1.53:8088
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};
if( process && process.env.NODE_ENV == 'production')
{
    opt.baseURL = "https://www.infish.cn/xwjErpApi";
} else {
    opt.baseURL = "api";
}

const http = axios.create(opt);

const requestInterceptors = http.interceptors.request.use( config =>{
    if(!http.pauseAutoLoading) Bus.$emit("loading",true);
    
    // if( window.authjwt )
    // {
    //     config.headers[""] = window.authjwt;
    // }

    return config;
},  error =>{
    Bus.$emit("loading",false);

    return Promise.reject(error);
});

// 添加响应拦截器
const responseInterceptors = http.interceptors.response.use( response =>{
    if( !http.pauseAutoLoading )  Bus.$emit("loading",false);

    if( response.status == 200 && response.data.errorNo == "401") {
        Bus.$emit("login");
    }
    return response;
},  error =>{
    Bus.$emit("loading",false);
    // 对响应错误做点什么
    return Promise.reject(error);
});

window.requestInterceptors = requestInterceptors;
window.responseInterceptors = responseInterceptors;

window.Infish = {
    http: {
        post(url, data) {
            return http.post(url, data?qs.stringify(data):null);
        },
        get(url) {
            return http.get(url);
        }
    }
};
export default http;