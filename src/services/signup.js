// import http from './http';
// import qs from 'qs';
import mock from './mockHttp';

export async function offlineList () {
  return mock.get('/offline/course/getAll');
}
