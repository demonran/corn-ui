import http from './upload';
import qs from 'qs';

export default {
    uploadImg(param) {
        return new Promise((resolve, reject) => {
            http.post('/image/upload', param).then(e => {
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

}
