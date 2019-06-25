import http from './server';
import qs  from 'qs';

export async function login(userName,password) {
    return http.post("/erp/user/login",qs.stringify({userName,password}));
}
