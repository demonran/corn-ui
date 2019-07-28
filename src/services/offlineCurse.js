import http from './http';
import mock from './mockHttp';

import qs from 'qs';

<<<<<<< HEAD
export async function createCourse (data) {
  return http.post('/course/create', data);
=======
export async function createCourse(data) {
  return mock.post('/course/create', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
>>>>>>> 1601498c3a4bf87b964e46b7d99068fb3ce060f5
}

export default {
  list(query) {
    let params = qs.stringify(query);
    return http.get('/course/offline/search?' + params);
  },
  delete(id) {
    return mock.delete('/offline/course/' + id);
  },
  create(data) {
    return http.post('/course/offline/create', data);
  }
};
