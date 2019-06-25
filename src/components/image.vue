<style lang="less" scoped>
    .container{
        display: flex;
        flex-wrap: wrap;
        .item{
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid gray;
            background-repeat: no-repeat;
            background-size: cover;

            i{
                cursor: pointer;
                margin: 0 4px;
            }
        }
    }
</style>

<template>
<div class="container">
    <div v-if="multi">
        <div class="item" v-if="seleted.length>0">
            <i class="fa fa-plus-square" aria-hidden="true" @click="append(0)"></i>
        </div>
        
        <div v-for="(item,index) in seleted" :key="index" class="item" :style="{backgroundImage: 'url(' + item + ')'}">
        <i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit(index)"></i>
        <i class="fa fa-trash" aria-hidden="true" @click="del(index)"></i>
        <i class="fa fa-plus-square" aria-hidden="true" @click="append(index+1)"></i>
        </div>
        <div class="item" >
            <i class="fa fa-plus-square" aria-hidden="true" @click="append(undefined)"></i>
        </div>
    </div>
    <div v-else>
        <div class="item" :style="{backgroundImage: 'url(' + seleted[0] + ')'}">
        <i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit(0)" v-if="seleted[0]"></i>
        <i class="fa fa-plus-square" aria-hidden="true" @click="append(0)" v-if="!seleted[0]"></i>
        </div>
    </div>
</div>
</template>
<script>
import comm from "../screens/mix";

export default {
    mixins:[comm],

    props:{
        multi:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {
            seleted:[]
        }
    },
    watch:{
        data(){
            this.seleted = this.data;
        }
    },
    mounted() {
        this.seleted = this.data;

        console.log("-->", this.data);
    },
    methods:{
        
        async append(index)
        {
            let imgs = await this.selectImages();
            let n = imgs.length;
            if( n< 1) return;

            if( !this.multi )
            {
                this.seleted[0] = imgs[0];
                this.$emit("change", this.seleted);
                return;
            }

            if(index == undefined) index = this.seleted.length;
            
            let ret = [];
            if( index>0 ){
                for(let i=0; i<index; i++) {
                    ret.push(this.seleted[i] );
                }
            }
            for( let k=0;k<n;k++) ret.push(imgs[k]);
            let lastLenth = this.seleted.length - index;
            if( lastLenth > 0) {
                n = this.seleted.length;
                for(let k= index; k<n; k++) ret.push(this.seleted[k] );
            }
            this.seleted = ret;
            console.log( ret );

            this.$emit("change", this.seleted);
        },
        del(index)
        {
            this.seleted.splice(index,1);
            this.$emit("change", this.seleted);
        },
        async edit(index)
        {
            let imgs = await this.selectImages();
            let n = imgs.length;
            if( n< 1) return;
            let img = imgs[0];
            
            let ret = this.seleted.slice(0);
            ret[index] = img;
            this.seleted = ret;
            this.$emit("change", ret);
         }
    }
}
</script>
