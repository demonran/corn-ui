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
            user-select: none;

            i{
                cursor: pointer;
                margin: 0 4px;
                color: red;
            }
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
    <div class="item" :style="{backgroundImage: 'url(' + value + ')'}" @click.prevent.stop="add" @dblclick="clickPreview">
        <div class="op">
            <i class="fa fa-pencil-square-o" aria-hidden="true" @click.stop="edit" v-if="value"></i>
            <i class="fa fa-plus-square" aria-hidden="true" @click.stop="edit" v-if="!value"></i>
            <i class="fa fa-trash" aria-hidden="true" @click.stop="del" v-if="value"></i>
        </div>
        <span class="size">
            {{size}}
        </span>
    </div>
    <div class="preview" v-show="preview" @click="preview = false">
        <img :src="value" alt="" >
        <span class="size">{{size}}</span>
    </div>
</div>
</template>
<script>
import comm from "../screens/mix";

export default {
    mixins:[comm],

    props:{
        value:{
            type:String,
            default:""
        }
    },
    data(){
        return {
            size:'0x0',
            preview:false,
        }
    },
    watch:{
        value(){
            if( !this.value ) {
               this.size = "0x0";
               return;
            }
            var temImg = new Image();
            temImg.onload = () => {
                this.size = `${temImg.width}x${temImg.height}`;
            }
            temImg.src = this.value;
        }
    },
    mounted() {
    },
    methods:{
        async edit()
        {
            let imgs = await this.selectImages();
            let n = imgs.length;
            if( n< 1 || !imgs[0] ) return;

            this.$emit("input", imgs[0]);
            this.$emit("change", imgs[0]);

        },
        del() {
            this.$emit("input", "");
            this.$emit("change", "");
        },
        add(){
            if( !this.value ) {
                this.edit();
            }
        },
        clickPreview()
        {
            if( !this.value ) return;
            this.preview = true;
        }
    }
}
</script>
