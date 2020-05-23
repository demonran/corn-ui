import {apiGen} from "@/utils/request";


const url = '/wx/mp/config'
const api = {
  query: `get ${url}`,
  update: `post ${url}`,
}

export default apiGen(api)
