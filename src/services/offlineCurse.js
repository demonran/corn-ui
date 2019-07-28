import http from './http';
import mock from './mockHttp';

import qs from 'qs';

export async function createCourse (data) {
  return http.post('/course/create', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export default {
  list () {
    return mock.get('/offline/course/getAll');
  }
};
