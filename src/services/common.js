import http from "./http";
import qs from "qs";

export default {
  uploadImg(param) {
    return new Promise((resolve, reject) => {
      http
        .post("/image/upload", param)
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
  get(url, data) {
    return new Promise((resolve, reject) => {
      http
        .get(url, data)
        .then(res => {
          if (res.errorNo == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      http
        .post(url, data)
        .then(res => {
          if (res.errorNo == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  delete(url, data) {
    return new Promise((resolve, reject) => {
      http
        .delete(url, data)
        .then(res => {
          if (res.errorNo == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  put(url, data) {
    return new Promise((resolve, reject) => {
      http
        .put(url, data)
        .then(res => {
          if (res.errorNo == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  patch(url, data) {
    return new Promise((resolve, reject) => {
      http
        .patch(url, data)
        .then(res => {
          if (res.errorNo == 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
};
