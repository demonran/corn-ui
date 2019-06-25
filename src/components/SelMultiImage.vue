<style lang="less" scoped>
    .container{
        display: flex;
        flex-wrap: wrap;
        .item{
            width: 100px;
            height: 100px;
            position: relative;
            border: 1px solid gray;
            background-repeat: no-repeat;
            background-size: contain;
            margin:  2px;
            cursor:move;

            &.sel{
                border: 2px solid crimson;
            }
            i{
                cursor: pointer;
                margin: 0 4px;
                color: crimson;
            }
        }
         .op{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
        }
        .size {
            color:red;
            position:absolute;
            bottom: 0;
            right: 0;
        }
    }

.preview{
   background-color: rgba(0, 0, 0, 0.8);
   position: fixed;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   z-index: 200;
   display: flex;
   justify-content: center;
   align-items: center;
   overflow: auto;
    .size{
       font-size: 30px;
       left: 50%;
       top:50%;
   }
}

</style>

<template>
<div class="container">
    <draggable v-model="seleted" class="container" @start="onStart" @end="onEnd">
        <div v-for="(item,index) in seleted" :key="index" class="item" :style="{backgroundImage: 'url(' + item + ')'}" :class="{sel:curIndex==index}" @click="clickImage(index)" @dblclick="clickPreview(item,index)">
            <div>
                <i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit(index)"></i>
                <i class="fa fa-trash" aria-hidden="true" @click="del(index)"></i>
            </div>
            <span class="size">
                {{sizes[index]}}
            </span>
        </div>
    </draggable>

    <div class="item" @click="append">
        <i class="fa fa-plus-square" aria-hidden="true" ></i>
    </div>


    <div class="preview" v-show="preview" @click="preview = false">
        <img :src="previewUrl" alt="" >
        <span class="size">{{preViewSize}}</span>
    </div>
</div>
</template>
<script>
import comm from "../screens/mix";
import draggable from 'vuedraggable'

export default {
    mixins:[comm],
    components:{
        draggable
    },

    props:{
        value:String
    },
    data(){
        return {
            seleted:[],
            sizes:[],
            preview:false,
            previewUrl:"",
            preViewSize:"",
            curIndex:-1,
        }
    },
    watch:{
        value() {
            this.parse();
        }
    },
    mounted() {
        this.parse();
    },
    methods:{
        clickImage(index)
        {
            this.curIndex = index;
            this.$emit("selChange", index);
        },

        parse()
        {
            let ret = [],sizeArr=[];
            if( this.value ) {
                ret = this.value.split(",");
            }
            this.seleted = ret;
            this.sizes = [];

            let n = ret.length,k=0;
            for( let i=0; i<n; i++)
            {
                var temImg = new Image();

                temImg.onload = (() => {
                    let index = i, img = temImg;

                    return ()=>{
                        let size = `${img.width}x${img.height}`;
                        let a = this.sizes.slice(0);
                        a[index] = size;
                        this.sizes = a;
                    }
                })();

                temImg.src =ret[i];
            }
            
        },
        clickPreview(item, index)
        {
         

            if( !this.value ) return;
            this.preview = true;
            this.previewUrl = item;

            this.preViewSize = this.sizes[index];
        },
        onStart(event)
        {
            this.dragging = this.seleted[event.oldIndex];
            this.curIndex = event.oldIndex;
        },
        onEnd()
        {
            this.curIndex = this.seleted.indexOf( this.dragging );
            this.dragging = null;
            let v = this.seleted.join(",");
            this.$emit("input", v);
            this.$emit("change", v);
        },

        async append()
        {
            let imgs = await this.selectImages();
            let n = imgs.length;
            if( n< 1) return;
   
            let ret = this.seleted.slice(0);
            for( let k=0;k<n;k++) ret.push(imgs[k]);

            let v =  ret.join(",");
            this.$emit("input", v);
            this.$emit("change", v);
        },

        del(index)
        {
            let ret = this.seleted.slice(0);
            ret.splice(index,1);

            let v = ret.join(",");
            this.$emit("input", v);
            this.$emit("change", v);
        },

        async edit(index)
        {
            let imgs = await this.selectImages();
            let n = imgs.length;
            if( n< 1) return;
            let img = imgs[0];
            
            let ret = this.seleted.slice(0);
            ret[index] = img;

            let v = ret.join(",");
            this.$emit("input", v);
            this.$emit("change", v);
         }
    }
}
</script>
