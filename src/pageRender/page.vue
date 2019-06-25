<style lang="less" scoped>
.page {
    width:"100%";
    height: "100%";
}
</style>

<template>
    <div class="page">
        <component  v-for="(item,index) in layouts" v-bind:is="item.name" :key="index" :data="data[item.data]" :dataSources="getCompDataSource(item.dataSource)"></component>
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
            dataSources:null,//网络下载的所有数据源的数据
            data:{},
            layouts:[{name:'cmp-swiper',dataId:'swipper'}],//所有组件布局{name:"", dataId:''}
        }
    },
    
    created()
    {
        //根据pageId获取页面数据
        let pageDate = {};

        //根据api获取相应的数据

        let datas = {
            swipper:{images:[{name:'https://xwjshopdev.oss-cn-beijing.aliyuncs.com/images/basic/zs%402x.png',type:'3d',src:'xx'}],rate:0.5}
        };

        this.data =datas;
    },
    methods:{
        getCompDataSource(cfg)
        {
            if( !cfg ) return {};
            let ret = {};
            cfg.forEach(dataS => {
                  let name = dataS.name;
                  let ds = this.dataSources[name]; 
                  if( !ds ) {
                      console.error("not find datasource " + name + " data");
                      return;
                  }
                  ret[dataS.name] = ds.getRangeData(dataS.range);
            });
            return ret;
        }
    }
}
</script>
