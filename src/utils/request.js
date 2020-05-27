import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
const { parse, compile } = require("path-to-regexp")
import patch from "@/services/httpPatch";

let opt = {
  timeout: 10000,
  headers: { "Content-Type": "application/json" }, // 'application/x-www-form-urlencoded'
  baseURL: "/api-yumimiao",
};

const http = axios.create(opt);

export default function request(options) {
  let { data, url, method = 'get' } = options
  const cloneData = cloneDeep(data)

  try {
    const match = parse(url)
    url = compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
  } catch (e) {
    console.log(e)
  }

  options.url = url
  options.params = cloneData

  if(options.method === 'get') {
    return patch(http, method)(url, {params: data})
  }

  return patch(http, method)(url, cloneData)

}

const gen = params => {
  let url =  params
  let method = 'get'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url =  paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      method,
      data
    })
  }
}

const apiGen =  (api) => {
  const APIFunction = {}
  for (const key in api) {
    APIFunction[key] = gen(api[key])
  }
  return APIFunction;
}
export {
  apiGen
}

