import {apiGen} from "@/utils/request";


const url = '/course-study'
const api = {
  query: `get ${url}`,
  list: `get ${url}`,
  update: `post ${url}`,
  signIn: `post ${url}/sign`,
  listStudent: `get ${url}/lesson-student`
}

export default apiGen(api)
