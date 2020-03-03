import http from './http';
import mock from './mockHttp';

import qs from 'qs';

export default {
  list (query) {
    let params = qs.stringify(query);
    return http.get('/offline-course/search?' + params);
  },
  delete (id) {
    return http.delete('/offline-course/' + id);
  },
  image (id) {
    return http.patch('/offline-course/image' + id);
  },
  create (data) {
    return http.post('/offline-course/create', data);
  },
  update(id,data){
    return http.put('/offline-course/'+id,data);
  },
  recommend(data,rec){
    //console.log(data);
    var recommend={
       "recommend": rec
    }
    return http.patch('/offline-course/recommend/'+data.courseId,recommend);
  },
  change(id,status){
    return http.patch('/offline-course/status/'+ id,status);
  }
};
