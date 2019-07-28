import http from './http';
import mock from './mockHttp';

import qs from 'qs';


export default {
  list(query) {
    let params = qs.stringify(query);
    return http.get('/course/offline/search?' + params);
  },
  delete(id) {
    return mock.delete('/course/offline/' + id);
  },

  create(data) {
    return http.post('/course/offline/create', data);
  }
};
