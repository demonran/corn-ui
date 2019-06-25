
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
    全景方案选择
    <div class="op">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>

    <DbTable ref="db" dbName="vr" :cols="cols" :mulSel="true" id="id" @onOp="op" query="filters" @row-dblclick="onSubmit">  </DbTable>

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
                id:"ID",
                panoramaName:"名称",
                panoramaDesc:"描述",
                addTime:["创建时间",this.fmtRowTime('addTime')],
                lastModify:["修改时间",this.fmtRowTime('lastModify')],
                _op:["预览"],
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
        op()
        {
            
        }
    },
    mounted(){
    }
}
</script>
