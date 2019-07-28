import http from './http';
import mock from './mockHttp';

import qs from 'qs';

export async function createCourse (data) {
  return mock.post('/course/create', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export default {
  list (query) {
    let params = qs.stringify(query);
    return mock.get('/offline/course/search?' + params);
  },
  delete (id) {
    return mock.delete('/offline/course/' + id);
  }
};
