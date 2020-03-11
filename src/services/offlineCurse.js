import qs from "qs";
import common from "./common";
import http from './http';

export default {
  /*  list (query) {
      let params = qs.stringify(query);
      return http.get('/offline-course/search?' + params);
    }, */
  list(param) {
    return common.get("/offline-course/search?" + qs.stringify(param));
  },
  getItem(id) {
    return http.get('/offline-course/' + id);
  },
  delete(id) {
    return http.delete('/offline-course/' + id);
  },
  image(id) {
    return http.patch('/offline-course/image' + id);
  },
  create(data) {
    return http.post('/offline-course/create', data);
  },
  update(id, data) {
    return http.put('/offline-course/' + id, data);
  },
  recommend(data, rec) {
    //console.log(data);
    var recommend = {
      "recommend": rec
    }
    return http.patch('/offline-course/recommend/' + data.courseId, recommend);
  },
  change(id, status) {
    return http.patch('/offline-course/status/' + id, status);
  }
};
