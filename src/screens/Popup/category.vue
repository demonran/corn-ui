<template>
<div>
    类别选择
    <DataCategory ref="data" :selectable="true" dataType="in"/>

    <div class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
</div>
</template>

<script>
import comm from "../mix";
import { mapState,mapActions} from "vuex";
import DataCategory from "../../components/data/category";

export default {
    components:{
        DataCategory,
    },
    props:{
        type:String
    },

    mixins:[comm],

    data() {
        return {
            selected:[],
        }
    },
    computed:{
       
    },
    methods:{
       
        onSubmit()
        {
            this.$emit("close");
        },
        getSelected(){
            return this.$refs.data.selected;
        }
    },
    mounted(){
    }
}
</script>

<style lang="less" scoped>
.image{
    width: 80px;
    height: 80px;
}
</style>
