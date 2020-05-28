import {apiGen} from '@/utils/request'

const url = 'lesson';

const api = {
  list: `get ${url}`,
  get: `get ${url}/:id`,
  add: `post ${url}`,
  edit: `put ${url}`,
  del: `delete ${url}/:id`,
}

export default apiGen(api)
