<style lang="less">
.imgcrop-editor{
    padding: 5px 20px;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #333;
    z-index: 1000;
    overflow: hidden;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    img {
        max-width: 100%;
    }
}
.cropped{
    position:absolute;
    top: 0;
    left: 0;
    width: 20%;
}

</style>
<template>
   <div class="imgcrop-editor" width="100%" title="商品抠图" :close-on-click-modal="false" @dblclick="dbclick">
       
       <div class="sel-img" v-if="!editingImg">
           <el-button type="primary" @click="selectImage">选择图片</el-button>
       </div>

       <img id="image" :src="editingImg" ref="imgedit" >

       <img class="cropped" :src="croppedImg">
   </div>
</template>

<script>
import mix from "../mix";
import Cropper from 'cropperjs';
import oss from "./oss";

export default {
    mixins:[mix],
    props:{
        callback:Function,
    },

    components:{
       
    },
    computed:{
        
    },
    data() {
        return {
           editingImg:"",
           croppedImg:""
        }
    },
    created()
    {
       
    },
    mounted()
    {
       

        let scope = this;
        function onKeyDown(event)
        {
            if( event.code == "Escape")
            {
                if( scope.hided ) return;
                scope.hided = true;

                scope.callback && scope.callback();

                scope.$emit("close");
            }
        }
        this.onKeyDown = onkeydown;
        document.addEventListener("keydown",onKeyDown,false);
    },

    destroyed()
    {
        document.removeEventListener("keydown", this.onKeyDown);
    },

    methods:{
       
        async selectImage()
        {
            let img = await this.selectImages();
            if( img.length < 1 ) return;

            this.editingImg = img[0];

            this.$nextTick(()=>{
                this.startCropp();
            })
        },
        dbclick() {
            
           let loading = this.showLoading();

            let scope = this;
            async function handleBlob(b)
            {
                let target = Date.now();
                let ret = await oss.put("images/panocropped/" + target + ".jpg", b);
                if( ret.res.status == 200 )
                {
                
                    let url = ret.url;
                    if( url.indexOf("//") == 0 ) url = `https:${url}`;
                    else if(url.indexOf('http:')== 0) url = `https:${url.substr(5)}`;
                    
                    let result = {
                        x: scope.cx,y:scope.cy,w:scope.cw, h:scope.ch, url:url
                    }
                    scope.callback && scope.callback(result);
                    scope.$emit("close");
                }  
                loading.close();
            }
            this.cropper.getCroppedCanvas().toBlob((blob)=>{
                handleBlob(blob);
            },"image/jpeg", 1);
        },

        startCropp()
        {
            const image = this.$refs.imgedit;
            let scope = this;
            const cropperEdit = new Cropper(image, {
            // aspectRatio: 16 / 9,
                crop(event) {
                    scope.cx = event.detail.x;
                    scope.cy = event.detail.y;
                    scope.cw = event.detail.width;
                    scope.ch = event.detail.height;

                    console.log(scope.cx,scope.cy,scope.cw,scope.ch)
                    // console.log(event.detail.rotate);
                    // console.log(event.detail.scaleX);
                    // console.log(event.detail.scaleY);
                },
                cropend(event){
                    let cropped = cropperEdit.getCroppedCanvas()
                    scope.croppedImg = cropped.toDataURL('image/jpeg');
                  
                    console.log(event.detail );
                    // cropperEdit.getCroppedCanvas().toBlob((blob) => {
                    //      console.log("xx",blob);
                    // });
                }
            });
            this.cropper = cropperEdit;
        }

    }
}
</script>