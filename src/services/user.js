import http from './http';
import qs from 'qs';

export async function postLogin (data) {
  return http.post('/api-yumimiao/login', qs.stringify(data));
}

export async function postLoginout () {
  return http.get('/api-yumimiao/logout');
}
