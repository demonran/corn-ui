<template>
<div>
    <div class="row">
        <span>名称</span>
        <el-input  class="input" size="small" v-model="name"></el-input> 
        <el-button type="primary" size="small" @click="onSubmit">确 定</el-button>
    </div>
</div>
</template>

<script>

export default {
    props:{
        type:String
    },
    data() {
        return {
            name:"",
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
            return this.name;
        }
    },
}
</script>

<style lang="less" scoped>
.row{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    
    span{
        flex-shrink: 0;
        margin-right: 10px;
    }
}
.input{
    width: 200px;
    margin-right: 20px;
}

</style>
