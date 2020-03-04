import http from './http';
import qs from 'qs';
// import mock from './mockHttp';

export default {
  // 离线报名列表
  list(param) {
   //return http.get('/registration/getAll?' + qs.stringify(param));
    return new Promise((resolve, reject) => {
      http.get('/registration/getAll?' + qs.stringify(param)).then(e => {
        resolve(e);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取单条报名数据
  signupItem(id) {
    return new Promise((resolve, reject) => {
      http.get('/registration/' + id).then(e => {
        resolve(e);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 离线报名某项
  getOfflineItem(id) {
    return http.post('/registration/', id);
  },

  // 添加报名信息
  addOffline(param) {
    return new Promise((resolve, reject) => {
      http.post('/registration/create', param).then(e => {
        resolve(e);
      }).catch(e => {
        reject(e);
      });
    });
    //return http.post('/registration/create', param);
  },

  // 更新离线报名信息
  updateOffline(id, param) {
    return http.put('/registration/' + id, param);
  },

  // 删除单条离线报名
  delOffline(id) {
    console.log(id)
    return http.delete('/registration/' + id);
  }
}
