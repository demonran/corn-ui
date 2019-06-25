<template>
   <el-dialog width="80%" :title="title" :visible="popup!=''" :close-on-click-modal="false" @close="onclose">
       <ImagesWrapper v-show="showImages" ref="imgs" :type="popup" @close="onclose"/>
       
       <Skus v-if="popup=='selectSkus'" ref="skus" :type="popup" @close="onclose"/>

       <Category v-if="popup=='selectCategory'" ref="category" :type="popup" @close="onclose"/>

       <Name v-if="popup=='getName'" ref="name" :type="popup" @close="onclose"/>

       <Goods v-if="popup=='selectGoods'" ref="goods" :type="popup" @close="onclose"/>
        
        <Panorama v-if="popup=='selectPanorama'" ref="pano" :type="popup" @close="onclose"/>

   </el-dialog>
</template>

<script>
import ImagesWrapper from "./images";
import Skus from "./Skus";
import Category from "./category";
import Name from "./name";
import Goods from "./Goods";
import Panorama from "./Panorama";

export default {
    components:{
        ImagesWrapper,
        Skus,
        Category,
        Name,
        Goods,
        Panorama
    },
    computed:{
        title(){
            if( this.showImages) return "选择图片"
        },
        showImages()
        {
            return this.popup == 'selectImages' || this.popup == 'showImages';
        }
    },
    data() {
        return {
           popup:''
        }
    },
    mounted()
    {
        Bus.$on('selectImages',(cb)=>{
            this.popup = "selectImages";
            this.pupopCallback = cb;
        });
        
        Bus.$on('showImages',(cb)=>{
            this.popup = "showImages";
        });

        Bus.$on('selectSkus',(cb)=>{
            this.popup = "selectSkus";
            this.pupopCallback = cb;
        });

        Bus.$on('selectCategory',(cb)=>{
            this.popup = "selectCategory";
            this.pupopCallback = cb;
        });
        Bus.$on('getName',(cb)=>{
            this.popup = "getName";
            this.pupopCallback = cb;
        });
        
        Bus.$on('selectGoods',(cb)=>{
            this.popup = "selectGoods";
            this.pupopCallback = cb;
        });
        Bus.$on('selectPanorama',(cb)=>{
            this.popup = "selectPanorama";
            this.pupopCallback = cb;
        });

    },

    destroyed()
    {
        Bus.$off('showImages');
        Bus.$off('selectImages');
        Bus.$off('selectSkus');
        Bus.$off('selectCategory');
        Bus.$off('getName');
        Bus.$off('selectGoods');
        Bus.$off('selectPanorama');
    },

    methods:{
        onclose(){
            let ret = [];
            if( this.popup == 'selectImages')  ret = this.$refs.imgs.getSelectedImages();
            else if( this.popup == 'selectSkus') ret = this.$refs.skus.getSelected();
            else if( this.popup == 'selectCategory') ret = this.$refs.category.getSelected();
            else if( this.popup == 'getName') ret = this.$refs.name.getSelected();
            else if( this.popup == 'selectGoods') ret = this.$refs.goods.getSelected();
            else if( this.popup == 'selectPanorama') ret = this.$refs.pano.getSelected();


            this.pupopCallback && this.pupopCallback(ret);

            this.popup = "";
        }
    }
}
</script>

<style lang="less">
.el-dialog__body{
    padding: 5px 20px;
}
</style>
