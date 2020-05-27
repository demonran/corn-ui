import {apiGen} from "@/utils/request";


const url = '/course-study'
const api = {
  query: `get ${url}`,
  list: `get ${url}`,
  update: `post ${url}`,
  signIn: `post ${url}/sign`
}

export default apiGen(api)
