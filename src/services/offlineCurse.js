import http from './http';
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
    return http.get('/course/getAll');
  }
};
