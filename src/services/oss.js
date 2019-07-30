

const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIjY0NjBpEkpUR',
  accessKeySecret: 'hcbqkZADWy0GflyVMsHoXPiRtL6nIM',
  bucket: 'xwjshopdev',
  endpoint: 'oss-cn-beijing.aliyuncs.com'
});

async function Upload(files, {getFileName, dir})
{
    //上传图片
    let n = files.length;
    let ok = true;
    for(let i=0;i<n;i++) {
        let file = files[i];
        let ret =  await  client.put(dir + getFileName(file), file);
        ok = ok && ret.res.status == 200;
        if( !ok ) {
            console.error(`文件${file.name}上传失败`);
        }
    }
    return ok;
}




