export async function getPageConf(id)
{
    let ret = await Infish.http.get("/erp/designScheme/detail?id="+id);
    if( ret.data.errorNo == "0")
    {
        try {
            let cfg = JSON.parse(ret.data.result.contentData);
            return cfg;
        } catch (error) {
            console.error("配置文件的JSON文件不合法");
        }
        return;
    }
    console.error(ret.data.errorDesc);
}

// export function getSkuList(query){
//     return request.get('skuList', query);
// }


// let request = {
//     get: function(url, data){
//         return new Promise(resolve => {
//             let res = require('./mock/' + url + '.js').default;
//             resolve(res);
//         });
//     }
// }
