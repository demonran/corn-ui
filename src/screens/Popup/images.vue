
<style lang="less" scoped>
.top {
    margin-bottom: 10px;
    display: flex;
    .input{
        width: 150px;
        margin-right: 10px;
    }
}
.upload{
   display: flex;
   margin-bottom: 10px;
}

.image-container{
    display: flex;
    flex-wrap:wrap;
    // height: 700px;
}
.title-item{
    cursor: pointer;
}

.title{
    margin-bottom: 10px;
}

.item{
    width: 100px;
    height: 100px;
    margin: 4px;
    border: 1px solid black;
    position: relative;
    color: red;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    user-select: none;

    .info {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    .size{
        position:absolute;
        bottom: 0;
        right: 0;
        user-select: none;
    }
    .delete {
        position:absolute;
        top: 4px;
        right: 4px;
    }

    &.select {
        border: 2px solid #409EFF;
    }
}
.dialog-footer{
   text-align: right;
   margin-top: 10px;
}
.checkbox{
    float: left;
    margin-left: 4px;
}
.upload{
    margin-left: 40px;
}
</style>

<template>
    <div>
     <div class="top">
     <el-input size="small" class="input" v-model="dirname"></el-input>

        <el-button @click.native.prevent="onCreateDir" size="small" type="primary">创建目录</el-button>
        <input class="upload" type="file" multiple ref="file" @input="selectNativeImages"/>

        <!-- <el-button @click.native.prevent="onUpload" size="small" type="primary">上传</el-button> -->
     </div>
     
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="title-item" v-for="(item,index) in nav" :key="index" @click.native="onClickTitle(index)">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="image-container">
        <div v-for="(item,index) in currImages" :key="index" class="item-box">
             <div v-if="item.type=='dir'" class="item" @dblclick="dbClickDir(item.name)">
                 <div class="size">
                      <i class="fa fa-folder" aria-hidden="true"></i>
                      {{item.name}}
                 </div>
                
                 <i class="fa fa-trash delete" aria-hidden="true" @click="deleteItem(item)"></i> 
             </div>
             <div v-else >
               <div v-tip.dark="item.name" class="item" :class="{select:selected.indexOf(item.url)>-1}" :style="{backgroundImage: 'url(' + item.url + ')'}"  @dblclick="dbClickImage(item)" @click.prevent.stop="toggleSelect(item)">
                            <el-checkbox class="checkbox" v-if="type=='selectImages'" :value="selected.indexOf(item.url)>-1"></el-checkbox>
                            <i class="fa fa-trash delete" aria-hidden="true" @click="deleteItem(item)"></i> 
                            
                            <span class="size">{{item.r}} {{item.size}}</span>
                </div>
             </div>
        </div>
    </div>

    <div v-if="currImages.length==0">
        无图片
    </div>

    <div class="dialog-footer" v-if="type=='selectImages'">
        <el-button type="primary" @click="onSubmit">确 定 {{selected.length>0?selected.length:""}}</el-button>
    </div>
    </div>
</template>

<script>
import comm from "../mix";

const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIjY0NjBpEkpUR',
  accessKeySecret: 'hcbqkZADWy0GflyVMsHoXPiRtL6nIM',
  bucket: 'xwjshopdev',
  endpoint: 'oss-cn-beijing.aliyuncs.com'
});
const INITFILE = '__initdata';
const IMAGEROOT = 'images/';

export default {
    components:{
    },

    props:{
        type:String
    },

    mixins:[comm],

    data() {
        return {
            currImages:[],
            selected:[],
            nav:["首页"],
            dirname:'',
            files:""
        }
    },
    methods:{
        dbClickImage(item)
        {
            let ret = item.url;
            this.selected = [ret];
            this.$emit("close");
        },

        toggleSelect(item)
        {    
            let url = item.url;
            let ret = this.selected.slice(0);

            let i = ret.indexOf(url);
            if( i < 0 ) {
                ret.push( url );
            } else {
                ret.splice(i,1);
            }
            this.selected = ret;

        },

        onSubmit()
        {
            this.$emit("close");
        },

        selectImage(e,item)
        {   
            let i = this.selected.indexOf(item.url);
            if(e == true) {
                if( i<0 ) this.selected.push(item.url);
                return;
            }
            if(i > -1) this.selected.splice(i,1);
        },

        deleteItem( item )
        {
            let tip = "确认删除文件";
            if( item.type == 'dir') tip +=`夹${item.name}?`;
            else tip += item.name + "?";

            let scope = this;
            this.showConfirm(tip,()=>{
                let dir = scope.getNavDir();
                dir = scope.getImageDir(dir);
                console.log( dir );

                dir += item.name; 
                if( item.type == 'dir') dir += "/";

                 scope.deleteFiles( dir ).then((ret)=>{
                    if( ret ) {
                        scope.updateImages().then(()=>{
                            scope.toast("删除成功");
                        })
                    }
                 })
            })
        },

        async deleteFiles(root)
        {
            const isDir = (root[root.length-1] == '/');
            //const result = await ctx.oss.delete('images/rtrt/');
            //枚举文件下的所有文件
            let names = [];
            if( isDir ) {
                const files = await client.list({prefix:root});
                if( files.objects ) {
                    names = files.objects.map(item=>item.name);
                }
                
            } else {
                names = [root];
            }

            let ret = true;
            if( names.length > 0 ) {
                ret = await client.deleteMulti(names);
                
                ret = ret && ret.res.status == 200;
            }
            if(root == IMAGEROOT ) {
                await client.put(IMAGEROOT + INITFILE, new Buffer("init time"));
            }
            return ret;
        },
        selectNativeImages()
        {
            this.onUpload();
        },

       async onUpload()
        {
            //上传图片
            let files = this.$refs.file.files,n = files.length;
            
            let dir = this.getNavDir();
            dir = this.getImageDir(dir);

            console.log("-->",dir);

            let ok = true;
            for(let i=0;i<n;i++)
            {
                let file = files[i];
                let ret =  await  client.put(dir + file.name, files[i]);

                ok = ok && ret.res.status == 200;
                if( !ok ) {
                    this.toast("",`文件${file.name}上传失败`);
                }
            }
            if( ok ) {
                this.toast("文件上传成功");
                
                this.updateImages();
            }
        },

        async onCreateDir()
        {
           //判定是否有重复
           let images = this.currImages,n=images.length,find=false;
           for(let i=0;i<n;i++)
           {
               if(images[i].type=='dir' && images[i].name == this.dirname) {
                   find = true;
                   break;
               }
               if( images[i].type != 'dir') {
                   break;
               }
           }
           if( find ) {
               this.toast("有相同的目录名");
               return;
           }

           let root = this.getNavDir();
           root +=(root!=""?"/"+ this.dirname: this.dirname);
           root = this.getImageDir(root);

            console.log("creating", root);
            const result = await client.put(root + INITFILE, new OSS.Buffer("init time"));
            if( result.res.status == 200 ) {
                this.nav.push(this.dirname);
                this.dirname = "";
                
                await this.updateImages();
                
                this.toast("创建成功");
            }
        },

        dbClickDir(name)
        {
            this.nav.push(name);
            this.updateImages();
        },

        onClickTitle(index)
        {
            let n = this.nav.length;
            if(n < 2 ) return;
            this.nav.splice(index+1,n-index-1);
            this.updateImages();
        },

        getSelectedImages(){
            
            let ret = [];
            this.selected.forEach(el=>{
                let url = el;
                if( el.indexOf("//") == 0 ) url = `https:${el}`;
                else if(el.indexOf('http:')== 0) url = `https:${el.substr(5)}`;
                ret.push( url );
            })
            return ret;
        },

        getImageDir(dir)
        {
            let  root = "images/";
            if(  dir) {
                let ps = dir.split("/");
                ps.map((p)=>{
                    if( p ) root += (p + "/");
                });
            }
            if( root[root.length-1] != '/') root +='/';
            return root;
        },

        async getImageList( dir )
        {
            const loading = this.showLoading();

            let root = this.getImageDir( dir );

          

            let result = await client.list({ prefix: root,delimiter:'/'});
            
            if( result.res.status != 200) {
                loading.close();
                return;
            }

            let objs = [];
            if( result.prefixes ) {
                
                let n = result.prefixes.length;
                while(n--) {
                    let item = result.prefixes[n];

                    objs.push({name:item.substr(root.length, item.length-root.length-1),fullname:item.substr(IMAGEROOT.length), type:'dir',size:0,url:""});
                }
            }

            if( result.objects ) 
            {
                let n = result.objects.length;
                while(n--) {
                    let item = result.objects[n];
                    let name = item.name;
                    if( name == root) continue;
                    if( name.substr(name.length - INITFILE.length) == INITFILE) continue;
                    
                    const isDir = (name[name.length-1] == '/' && item.size == 0);
                   
                    let size = Math.floor(item.size / 1024);
                    let M = Math.floor(size / 1024);
                    let s = "0KB";

                    if( M < 1 ) {
                        s = `${size}KB`;
                    } else {
                        let f = Math.floor( (size % 1024) / 1024 *100 );
                        s = `${M}.${f}M`;
                    }
                    let oneImg = {r:"0x0", name:item.name.substr(root.length), fullname:item.name.substr(IMAGEROOT.length), url:item.url, type:isDir?'dir':'image', size:s};
                    
                    let im = new Image();
                    im.onload = (()=>{
                        let m = im,o = oneImg;
                        return ()=>{
                            o.r = `${m.width}x${m.height}`;
                        }
                    })();
                    im.src = oneImg.url;
                    
                    objs.push(oneImg);
                }
            }
            this.currImages = objs;
  
            loading.close();
        },

        getNavDir()
        {
            let dir = "";
            let n = this.nav.length;
            for(let k=1;k<n; k++){
                dir += (dir != "" ?("/"+ this.nav[k]):this.nav[k]);
            }
            return dir;
        },

        async updateImages()
        {
            this.currImages = [];
           
            let dir = this.getNavDir();
            console.log( dir );

            await this.getImageList(dir);
        }

    },
    mounted(){
        //获取所有图片
      this.getImageList();
    }

}
</script>