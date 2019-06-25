<style lang="less" scoped>

</style>

<template>
    <div>
        <el-button @click="add" type="primary"  size="small" v-if="!disable">添加分类</el-button>
        <DataCmp dataType="out" :data="sels" ref="cate" :actions="disable?[]:['删除']" @onAction="onAction"/>
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex";
import comm from  "../screens/mix";
import DataCmp from "./data/category";

export default {
    mixins:[comm],
    components:{
        DataCmp
    },
    props:{
        list:{
            type:String,
            default:()=>"",
        },
        disable:{
            type:Boolean,
            default:false
        }
    },

    data(){
        return {
            sels:[],
        }
    },
    methods:{
      async add()
      {
            let cates = await this.selectCategory();
            let n = cates.length;
            if(n< 1) return;

            let proms = this.sels.slice(0);

            for(let i=0; i<n; i++)
            {
                proms.push( cates[i] ); 
            }
           
            this.sels = proms;
        },
        onAction({name,row})
        {
            let index = this.sels.indexOf(row );
            this.sels.splice(index,1);
        }
    },
    computed:{
        
    },
    async mounted() {
        let ids = this.list;
        ids = ids?ids.split(","):[];

        if( ids.length < 1) return;

        let dtaCmp = this.$refs.cate;

        await  dtaCmp.QueryCategorylist();

        let ret = [];
        dtaCmp.treeGridData.forEach(el => {
            let id = `${el.id}`;
            if( ids.indexOf(id) > -1) ret.push(el);
        });
        this.sels = ret;
    }
}
</script>
