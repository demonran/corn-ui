import http from './http';
import qs from 'qs';

export default {
  list(param) {
    // return http.get('/banners');
    return new Promise((resolve, reject) => {
      http.get('/banners?' + qs.stringify(param)).then(e => {
        if (e.errorNo == 200) {
          resolve(e)
        } else {
          reject(e);
        }
      }).catch(e => {
        reject(e);
      });
    });
  },

  add(param) {
    // return http.post('/banners', data)
    return new Promise((resolve, reject) => {
      http.post('/banners?', param).then(e => {
        if (res.errorNo == 200) {
          resolve(e)
        } else {
          reject(e);
        }
      }).catch(e => {
        reject(e);
      });
    });
  },
  deleteCat(id) {
    return http.delete('/banners/' + id)
  }

}
