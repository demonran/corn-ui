import http from './http';

const url = 'students';

export default {

  list(params) {
    return http.get(url, params)
  },
  add(data) {
    return http.post(url, data);
  }

}
