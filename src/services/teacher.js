import http from "./http";
import qs from "qs";

export default {
  list(param) {
    return new Promise((resolve, reject) => {
      http
        .get("/teachers?" + qs.stringify(param))
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
    return new Promise((resolve, reject) => {
      http
        .post("/teachers?", param)
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
  // 获取单项banner
  teacherItem(id) {
    return new Promise((resolve, reject) => {
      http
        .get("/teachers/" + id)
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
  // 编辑单项banner
  bannerEdtItem(param) {
    return new Promise((resolve, reject) => {
      http
        .put("/banners/" + param.id, param)
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
  // 删除单项
  del(id) {
    return new Promise((resolve, reject) => {
      http
        .delete("/banners/" + id)
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
  }
};
