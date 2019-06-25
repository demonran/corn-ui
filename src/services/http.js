import axios from 'axios';
const http = axios.create({
    baseURL: 'http://192.168.1.210:7001',
    timeout: 1000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});
export default http;