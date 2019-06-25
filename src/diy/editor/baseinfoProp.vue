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
.row{
    display: flex;
    align-items: center;
    margin: 3px 0;

    span{
        width: 50px;
        flex-shrink: 0;
    }
}
</style>

<template>
    <div>
        <el-input v-model.lazy="innerValue.title" size="mini" class="one-prop">
            <template slot="prepend">方案名称</template>
        </el-input>
        <div class="row">
            <span>户型</span>
            <el-select size="mini" v-model="innerValue.type" filterable  placeholder="请选择户型">
                <el-option :label="item.name" :value="item.id" v-for="item in typeList" :key="item.id"></el-option>
            </el-select>
        </div>

        <div class="row">
            <span>风格</span>
            <el-select size="mini" v-model="innerValue.style" filterable  placeholder="请选择风格">
                <el-option :label="item.name" :value="item.id" v-for="item in styleList" :key="item.id"></el-option>
            </el-select>
        </div>
        
        <el-input  v-model.lazy="innerValue.size" size="mini" class="one-prop">
            <template slot="prepend">面积</template>
        </el-input>

        <!-- <div class="row">
            <span>空间</span>
            <el-select size="mini" v-model="innerValue.areaId" filterable  placeholder="请选空间">
                <el-option :label="item.name" :value="item.id" v-for="item in spaceList" :key="item.id"></el-option>
            </el-select>
        </div> -->
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    props:{
        value:Object
    },
    components:{
    },
    computed:{
        ...mapGetters("category",["typeList","styleList","spaceList"]),
         stypeMap(){
            let ret= {};
            this.typeList.forEach(el => {
                ret[el.id] = el.name;
            });
            return ret;
        },
        styleMap(){
            let ret= {};
            this.styleList.forEach(el => {
                ret[el.id] = el.name;
            });
            return ret;
        },
        spaceMap(){
            let ret= {};
            this.spaceList.forEach(el => {
                ret[el.id] = el.name;
            });
            return ret;
        },
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
                type:"",
                style:"",
                size:"129m2",
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
                let v = {
                    title:this.innerValue.title,
                    type:this.stypeMap[this.innerValue.type],
                    style:this.styleMap[this.innerValue.style],
                    size:this.innerValue.size
                }
                this.$emit("input", v);
                this.$emit("change",v);
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

