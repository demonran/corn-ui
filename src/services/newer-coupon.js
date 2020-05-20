import {apiGen} from '@/utils/request'

const url = 'coupon/newer';

const api = {
  list: `get ${url}`,
  add: `post ${url}`,
  edit: `put ${url}`,
  del: `delete ${url}/:id`,
}

export default apiGen(api)
