import http from "./http";
import qs from "qs";
import * as qiniu from 'qiniu-js'

export default {
  uploadImg(param) {
    var file = param.get('file')
    var that = this
    return new Promise((resolve, reject) => {
      this.get("/qiniu/token").then(res => {
        var token = res.result
        var myKey = this.getKey(file.name)
        var observable = qiniu.upload(file, myKey, token, { fname: file.name, mimeType: null }, { useCdnDomain: true })
        var subscription = observable.subscribe({
          next(res) {
            // resolve(res)
          },
          error(err) {
            reject(err)
          },
          complete(res) {
            resolve({ result: 'http://image.yumimiao.cn/' + myKey })
          }
        }) // 上传开始
      }).catch(e => {
        reject(e)
      })
      // http
      //   .post("/image/upload", param)
      //   .then(e => {
      //     if (e.errorNo == 200) {
      //       resolve(e);
      //     } else {
      //       reject(e);
      //     }
      //   })
      //   .catch(e => {
      //     reject(e);
      //   });
    });
  },
  getKey(name) {
    var result = this.dateFormat('YYYYmmddHHMMSS', new Date()) + Math.ceil(Math.random()*1000) + '.' + name.split('.')[1]
    return result;
    // return 'temp'
  },
  dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
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
