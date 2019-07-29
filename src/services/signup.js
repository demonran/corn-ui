import http from './http';
import qs from 'qs';
// import mock from './mockHttp';

export async function offlineList (param) {
  return http.get('/registration/getAll?' + qs.stringify(param));
}
