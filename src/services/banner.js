import http from "./http";
import qs from "qs";

export default {
  list(param) {
    // return http.get('/banners');
    return new Promise((resolve, reject) => {
      http
        .get("/banners?" + qs.stringify(param))
        .then(e => {
          if (e.errorNo == 200) {
            resolve(e);
          } else {
            reject(e);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  add(param) {
    // return http.post('/banners', data)
    return new Promise((resolve, reject) => {
      http
        .post("/banners?", param)
        .then(e => {
          if (res.errorNo == 200) {
            resolve(e);
          } else {
            reject(e);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 获取单项banner
  bannerItem(id) {
    return new Promise((resolve, reject) => {
      http
        .post("/banneritem?", param)
        .then(e => {
          if (res.errorNo == 200) {
            resolve(e);
          } else {
            reject(e);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  // 删除单项
  del(id) {
    return new Promise((resolve, reject) => {
      http
        .post("/del?", param)
        .then(e => {
          if (res.errorNo == 200) {
            resolve(e);
          } else {
            reject(e);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};
