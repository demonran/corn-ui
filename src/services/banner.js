import http from './http';

export default {
  list () {
    return http.get('/banners');
  },

  add(data) {
      return http.post('/banners',data)
  },
  deleteCat(id) {
      return http.delete('/banners/'+id)
  }

}
