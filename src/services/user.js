import http from './http'
import qs from 'qs'

export async function getKaptcha () {
  return http.get('/api/kaptcha',{headers:{'Content-Type': 'image/jpeg'}})
}
