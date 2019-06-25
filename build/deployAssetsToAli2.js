var OSS = require('ali-oss');
var readdir = require('fs-readdir-promise');

var co = require('co');
var path = require('path');
var fs = require('fs');
var cdnpath = "erpv1/";

 var client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIbwRQ4jstYPzJ',
    accessKeySecret: 'fgnbbK1TN3buyaRqrYAcr67EngALVU',
    bucket: 'yumimiao'
});


/*
co(function*() {

    console.log( 'begin upload dist/ files!');

    var assetFiles = yield readdir('dist/');
    var n = assetFiles.length;
    while (n--) {
        var ass = assetFiles[n];
        console.log(ass);

        var ext = path.extname(ass)
        var stat = fs.lstatSync(`dist/${ass}`);  
        if( !stat.isDirectory() )
        {
            console.log('uploading '+ass);
            var ret =  yield client.put(cdnpath + ass, './dist/'+ass,{timeout:2000000});
            //console.log(ass+'->' + ret.url);
            if(ret){
                console.log( ret.url );
            }
        }
    }
    console.log( 'end upload dist/ files!');
});*/

function GetSubFiles( dir )
{
    return new Promise((reslove,reject)=>{
        co(function*() {
           let assetFiles = yield readdir( dir );
           reslove( assetFiles );
        });
    });
}

async function GetTotalFiles (dir)
{
    let subfiles = await GetSubFiles(dir);

    let files = [], len = subfiles.length;
    let ret = [];
    for(let i=0; i<len; i++)
    {
        let f = subfiles[i];

        let fpath =`${dir}/${f}`;
        var stat = fs.lstatSync(fpath);  
        if( !stat.isDirectory() ) {
            ret.push(fpath);
        } else {
            let fsubs = await GetTotalFiles(fpath);
            let size = fsubs.length;
            for(let k=0; k<size; k++)
            {
                ret.push( fsubs[k] );
            }
        }
    }
    return ret;
}

GetTotalFiles("dist").then((files)=>{
    
    handleFile(files);
});

async function handleFile(files)
{
    let i =0, len = files.length;
    for(;i<len; i++) {
        let fpath = files[i];
        if( path.extname(fpath) != ".map" ) 
        {
            await UploadOss(files[i]);
        }
    }
}
 
function UploadOss(src)
{
    return new Promise((resolve,reject)=>{

        co(function*() {
            let fpath = src.substr(5); //去掉前面的dist
            console.log('uploading '+ fpath);

            var ret =  yield client.put(cdnpath + fpath, src,{timeout:2000000});
            //console.log(ass+'->' + ret.url);
            let i = 0;
            while( !ret ) {
                if( i++ > 3 ) {
                    reject(`uploading ${src} error!`);
                    return;
                }
                ret =  yield client.put(cdnpath + fpath, dist,{timeout:2000000});
            }
            console.log( ret.url );

            resolve( ret );
        });
    });
}
