export default function Patch (http, method) {

  async function request (url, data, options) {
    try {
      options = Object.assign({}, options)
      options.url = url
      options.method = method
      options.data = data
      console.log(options)
      let ret = await  http(options)

      if (ret.status >= 200 && ret.status <= 300) {
        let data = ret.data;

        if (data.statusCode == 401) {
          window.Bus.$emit('Login401');
          return;
        }

        return {errorNo: data.statusCode ? data.statusCode : 200, result: data.data, errorDesc: data.errorMessage ? data.errorMessage : 'success'};
      }
      if (ret.status == 401) {
        window.Bus.$emit('Login401');
        return;
      }
      return {errorNo: ret.status, errorDesc: ret.statusText};
    } catch (error) {
      let status = 400;
      let desc = error.message;
      let response = error.response;
      if (response) {
        status = response.status;
        desc = JSON.stringify(response.data);
      }
      if (status == 401) {
        window.Bus.$emit('Login401');
        return;
      }
      return {errorNo: status, errorDesc: desc};
    }
  }

  return request;
}
