import http from './http';
import qs from 'qs';

export async function createCourse (data) {
  return http.post('/api/course/create', qs.stringify(data));
}

export default {
  list () {
    return http.get('/api/course/getAll');
  }
};
