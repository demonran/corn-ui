import http from './http';
import qs from 'qs';
// import mock from './mockHttp';

// 离线报名列表
export async function offlineList (param) {
  return http.get('/registration/getAll?' + qs.stringify(param));
}

// 离线报名某项
export async function getOfflineItem (id) {
  return http.post('/registration/', id);
}

// 添加离线报名信息
export async function addOffline (param) {
  return http.post('/registration/create', param);
}

// 更新离线报名信息
export async function updateOffline (id, param) {
  return http.delete('/registration/' + id, param);
}

// 删除单条离线报名
export async function delOffline (id) {
  return http.delete('/registration/' + id);
}
