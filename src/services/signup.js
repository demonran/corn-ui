import http from './http';
import qs from 'qs';
// import mock from './mockHttp';

// 离线报名列表
export function offlineList (param) {
 // return http.get('/registration/getAll?' + qs.stringify(param));
  return new Promise((resolve, reject) => {
    http.get('/registration/getAll?' + qs.stringify(param)).then(e => {
      resolve(e);
    }).catch(e => {
      reject(e);
    });
  });

}

// 离线报名某项
export async function getOfflineItem (id) {
  return http.post('/registration/', id);
}

// 添加离线报名信息
export function addOffline (param) {
   return new Promise((resolve, reject) => {
    http.post('/registration/create', param).then(e => {
      resolve(e);
    }).catch(e => {
      reject(e);
    });
  });
   //return http.post('/registration/create', param);
}

// 更新离线报名信息
export async function updateOffline (id, param) {
  return http.put('/registration/' + id, param);
}

// 删除单条离线报名
export async function delOffline (id) {
  console.log('0000')
  console.log(id)
  console.log(id.id)
  return http.delete('/registration/' + id);
}
