import http from './http';

export default {
  list () {
    return http.get('/categories');
  },

  add(data) {
      return http.post('/categories',data)
  },
  deleteCat(id) {
      return http.delete('/categories/'+id)
  }

}
