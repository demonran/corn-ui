
<style lang="less" scoped>
.image{
    width: 80px;
    height: 80px;
}
.op{
    margin: 10px 0;
}
</style>


<template>
<div>
    商品选择
    <div class="op">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>

    <DbTable ref="db" dbName="goods" :cols="cols" :mulSel="true" id="goodsId" query="filters">  </DbTable>

    <div class="op">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
</div>
</template>

<script>

import { mapState,mapActions} from "vuex";
import DbTable from "../../components/DbTable";
import comm from "../mix";

export default {
    mixins:[comm],

    components:{
        DbTable,
    },

    props:{
        type:String
    },
    data() {
        return {
            filters:"",
            
            cols:{
                    goodsId:"商品ID",
                    goodsName:"名称",
                    goodsNo:"货号",
                    imgUrls:{
                        type:"img",
                        label:"图片"
                    },
                    addTime:["创建时间",this.fmtRowTime("addTime")]
            }
        }
    },
    computed:{
    
    },
    methods:{
        getSelected(){
            return this.$refs.db.selected;
        },
        onSubmit()
        {
            this.$emit("close");
        },
    },
    mounted(){
    }
}
</script>
