<style lang="less" scoped>
.page {
    width:"100%";
    height: "100%";
}
</style>

<template>
    <div class="page">
        <component  v-for="(item,index) in layouts" v-bind:is="item.name" :key="index" :data="data[item.dataId]" :pageData="data"></component>
    </div>

</template>
<script>
export default {
    props:{
        pageId:{
            type:String,
            required:true
        },
    },
    data(){
        return {
            data:null,
            layouts:[{name:'cmp-swiper',dataId:'swipper'}],//所有组件布局{name:"", dataId:''}
        }
    },
    
    created()
    {
        
    }
}
</script>
