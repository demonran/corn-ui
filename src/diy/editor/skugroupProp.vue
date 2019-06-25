<style lang="less" scoped>
.item{
    display: flex;
    margin: 2px;
    align-items: center;

    .right {
        margin-left: 4px;

        .target{
            margin-top: 4px;
        }
    }
}
.one-prop{
    margin: 4px 0;
}

</style>

<template>
    <div>
        <el-input v-model.lazy="innerValue.title" size="mini" class="one-prop">
            <template slot="prepend">空间</template>
        </el-input>
        
        <SelectOneImage v-model="innerValue.image"/>

        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="innerValue.desc">
            </el-input>
    </div>
</template>

<script>
import SelectOneImage from "../../components/SelOneImage";
export default {
    props:{
        value:Object
    },
    components:{
        SelectOneImage
    },
    watch:{
        value()
        {
            this.dataIn();
        },
        innerValue:{
            handler(newName, oldName) {
                this.dataOut();
            },
            deep:true,
        }
    },

    data(){
        return {
            innerValue:{
                title:'',
                image:"",
                desc:""
            },
        }
    },
    mounted()
    {
        this.dataIn();
    },

    methods:{

        dataOut() {
            
            if( !this.dataIning ) {
                this.$emit("input", this.innerValue);
                this.$emit("change", this.innerValue);
                this.dataOuting = true;
            }
            this.dataIning = false;
        },

        dataIn()
        {
            if( this.dataOuting ) {
                this.dataOuting = false;
                return;
            }
            this.dataIning = true;
            if( !this.value ) {
                return;
            }
            this.innerValue = this.value;
        }
    }
}
</script>

