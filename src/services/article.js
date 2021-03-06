import {apiGen} from "@/utils/request";

const url = '/article'
const api = {
  list: `get ${url}`,
  add: `post ${url}`,
  edit: `put ${url}/:id`,
  del: `delete ${url}/:id`,
  getItem: `get ${url}/:id`
}

export default apiGen(api)

