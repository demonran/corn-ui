import http from './http';
import qs from 'qs';
// import mock from './mockHttp';

export async function offlineList (param) {
  return http.get('/registration/getAll?' + qs.stringify(param));
}

export async function getOfflineItem (id) {
  return http.post('/registration/', id);
}

export async function addOffline (param) {
  return http.post('/registration/create', param);
}

export async function updateOffline (id, param) {
  return http.delete('/registration/' + id, param);
}

export async function delOffline (id) {
  return http.delete('/registration/' + id);
}
