<style lang="less" scoped>
.page {
    width:"100%";
    height: "100%";
}
</style>

<template>
    <div class="page">
        <component  v-for="(item, index) in layouts" v-bind:is="item.name" :key="index" :data="item.data" :dataSource="getCompDataSource(item.dataSource)"></component>
    </div>
</template>
<script>
import { getPageConf } from "../service";
import DataSourcesMap from "../dataSource";

export default {
    props:{
        pageId:{
            type:String,
            required:true
        },
    },
    data(){
        return {
            layouts:[],
        }
    },
    
    async created()
    {
        // let layouts = [], data = {}, ds
        //根据pageId获取页面数据
        let pageConf = await getPageConf(this.pageId);
       if( !pageConf ) {
            return;
        }

        this.dsInstances = {};


        //根据api获取相应的数据
        let loading = [];
        pageConf.dataSource.forEach(ds=>{
            let dsIntance = DataSourcesMap[ds.name].create(ds.query,ds.config);
            loading.push(dsIntance.load());
            this.dsInstances[ds.name] = dsIntance;
        })
        Promise.all( loading ).then((rets)=>{
            //数据下载完毕，绘制UI
            this.layouts = pageConf.layouts;
        });
    },
    methods:{
        getCompDataSource(cfg)
        {
            if( !cfg ) return {};
            let ret = {};
            cfg.list.forEach(name => {
                let ds = this.dsInstances[name]; 
                if( !ds ) {
                    console.error("not find datasource " + name + " data");
                    return;
                }
                ret[name] = ds.getComponentData(cfg.default[name]);
            });
            return ret;
        }
    }
}
</script>
