

const OSS = require('ali-oss');
const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIbwRQ4jstYPzJ',
    accessKeySecret: 'fgnbbK1TN3buyaRqrYAcr67EngALVU',
    bucket: 'yumimiao'
});

async function Upload(files, {getFileName, dir})
{
    //上传图片
    let n = files.length;
    let result = [];
    for(let i=0;i<n;i++) {
        let file = files[i];
        let ret =  await  client.put(dir + getFileName(file), file);
        if(ret.res.status == 200)
        {
            result.push( ret.res.url );
            continue;
        }
        console.error(`文件${file.name}上传失败`);
    }
    return result;
}

function getFileExt(name)
{
    let arr = name.split('.');
    if( arr.length < 1) return "";
    return arr[arr.length-1];
}

async function uploadAvatar(file)
{
    let dbid =  localStorage.getItem('dbid');
    
    if( !dbid ) {

        window.Bus.$emit('Login401');
        
        return {
            errorNo:401,
            errorDesc:"用户未登录！",
            result:null
        }
    }

    //根据dbid获取上传图片的token
    let ret = await Upload(file,{dir: dbid +'/images/avatar/', getFileName:(name)=>{Date.now() + getFileExt(name)}});
    let ok = ret.length == 1;
    return {
        errorNo:ok?200:400,
        errorDesc:ok?"图片上传成功！":"图片上传失败！",
        result:ok?ret[0]:null
    }
}




