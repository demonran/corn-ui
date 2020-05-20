import {apiGen} from "@/utils/request";


const url = '/wx/config'
const api = {
  query: `get ${url}`,
  update: `post ${url}`,
}

export default apiGen(api)
