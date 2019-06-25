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
        .btn{
            margin: 4px;
        }
    }
}
.one-prop{
    margin: 4px 0;
}

</style>

<template>
    <div>
        
        <el-input placeholder="宽高比" v-model.lazy="innerValue.rate" size="mini" class="one-prop">
            <template slot="prepend">宽高比</template>
        </el-input>

        <draggable v-model="innerValue.images" @start="onStart" @end="onEnd">
        <div v-for="(item,index) in innerValue.images" :key="index" class="item">
            <SelectOneImage v-model="item.src"/>
            <div class="right"> 
                <el-dropdown size="mini"   class="btn" @command="handleCommand($event, index)">
                    <el-button type="primary"  size="mini">
                        {{SwiperImageType[item.type]}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="image">普通图片</el-dropdown-item>
                        <el-dropdown-item command="panorama">全景图</el-dropdown-item>
                        <el-dropdown-item command="web">网页</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-input placeholder="输入全局图连接或者网页url" v-model="item.target" class="target" v-if="item.type == 'web'">
                    <template slot="prepend">目标</template>
                </el-input>

                <el-button type="primary" class="btn" v-if="item.type == 'panorama'"  size="mini" @click="selectPano(item)">全景图ID->{{item.target}}</el-button>
                <el-button type="primary"   class="btn" v-if="item.type == 'panorama'"  size="mini">预览</el-button>

            </div>
        </div>
        </draggable>

        <el-button type="primary"  size="mini" @click="addImage">
            添加图片
        </el-button>
    </div>
</template>

<script>
import SelectOneImage from "../../components/SelOneImage";
import {SwiperImageType} from "../const";
import draggable from 'vuedraggable'
import mix from "../../screens/mix";

export default {
    mixins:[mix],

    props:{
        value:Object
    },
    components:{
        draggable,SelectOneImage
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
            SwiperImageType:SwiperImageType,
            innerValue:{
                rate:0.4,
                images:[]
            },
            
        }
    },
    mounted()
    {
        this.dataIn();
    },

    methods:{
        async addImage()
        {
            let imgs = await this.selectImages();
            let n = imgs.length;
            if( n< 1) return;

            this.innerValue.images.push({src:imgs[0], type:"image", target:""});
        },
        handleCommand(type, index)
        {
            this.innerValue.images[index].type = type;
        },
        onStart()
        {

        },
        onEnd()
        {

        },
        async selectPano(item)
        {
           let ret = await this.selectPanorama();
            if( ret.length < 1) return;
            item.target = ret[0].id;
        },

        dataOut() {
            let ret = {
                rate:this.innerValue.rate,
                images:this.innerValue.images
            }
            
            if( !this.dataIning ) {
                this.$emit("input", ret);
                this.$emit("change", ret);
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
                this.innerValue.rate = 0.4;
                this.innerValue.images = [];
                return;
            }
            
            this.innerValue.rate = this.value.rate?this.value.rate:0.4;
            this.innerValue.images = this.value.images?this.value.images:[];
        }
    }
}
</script>



