export default function Patch(http, methods)
{
    let requestMethod = http[methods];
    
     async function request ( url,data, options ) 
     {
        try {
            let dbid = localStorage.getItem('dbid');
            if( !options ) options = {headers:{}}
            options.headers['dbid'] = dbid;

            let ret = await requestMethod.call(http, url, data, options);
      
            if (ret.status >= 200 && ret.status <= 300) {
              let data = ret.data;
              return {errorNo: data.statusCode ? data.statusCode : 200, result: data.data, errorDesc: data.errorMessage ? data.errorMessage : 'success'};
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
            return {errorNo: status, errorDesc: desc};
          }
    }
    
    return request;
}