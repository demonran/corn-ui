import http from './http';
import qs from 'qs';

export async function postLogin (data) {
  return http.post('/login', qs.stringify(data),{
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  });
}

export async function postLoginout () {
  return http.get('/logout');
}
