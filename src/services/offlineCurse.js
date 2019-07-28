// import http from './http';
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
<<<<<<< HEAD
    let params = qs.stringify(query);
    return mock.get('/offline/course/search?' + params);
=======
    let params = qs.stringify( query );
    return http.get('/course/offline/search?'+params);
>>>>>>> 33df72468e6b7acb17d28112abe523f5bc408ee8
  },
  delete (id) {
    return mock.delete('/offline/course/' + id);
  }
};
