<style lang="less" scoped>
.item {
    display: flex;
    align-items: center;

    img{
        width: 80px;
        height: 80px;
    }
    .right {
        display: flex;
        flex-direction: column;
        margin-left: 8px;
    }
}
</style>

<template>
<div>
    <el-input v-if="value && value.totalPrice" v-model.lazy="value.totalPrice" size="mini" class="one-prop">
        <template slot="prepend">总价</template>
    </el-input>

    <div class="list" v-if="value && value.list">
        <el-button type="primary"  size="mini" @click="addSku">
            添加SKU
        </el-button>
        <div class="list">
            <div class="item" v-for="item in selected" :key="item.skuId">
                <img :src="item.imgUrl" alt="">
                <div class="right">
                    <span>名称：{{item.goodsName}}</span>
                    <span>价格：{{item.price}}</span>
                    <span>规格：{{item.color}} | {{item.specification}}</span>
                     <el-input v-model.lazy="item.amount" size="mini" class="one-prop">
                        <template slot="prepend">数量</template>
                    </el-input>
                    <el-button type="primary"  size="mini" @click="addSku">删除</el-button>
                </div>
            </div>
        </div>
    </div>
</div>    
</template>
<script>
import mix from "../../../screens/mix";
import { request } from 'https';
import {DataSources} from "../../const";

export default {
    mixins:[mix],
    props:{
        value:{
            type:Object,
            required:true
        }
    },
    data(){
        return {
            selected:[]
        }
    },
    watch:{
        value(){
            console.log("xxx", this.value );
            this.dataIn();
        }
    },
    mounted(){
        this.dataIn();
    },

    methods:{
        async addSku()
        {
            let skus = await this.selectSku();
            console.log( skus );
            if( skus.length < 1) return;

            let scope = this;
            function isSkuIdExist(id)
            {
                let n = scope.selected.length;
                let find = false;
                while(n--) {
                    if( scope.selected[n].skuId == id) {
                        find = true;
                        break;
                    }
                }
                return find;
            }
            let change = false;
            skus.forEach(sk => {
                if( !isSkuIdExist(sk.skuId) ) {
                    this.selected.push({skuId:sk.skuId,amount:1,price:sk.price,color:sk.color, goodsName:sk.goodsName, specification:sk.specification, imgUrl:sk.skuImage});
                    change = true;
                }
            });
            if( change ){
                this.dataOut();
            }
        },
        dataOut()
        {
            this.dataOuting = true;
            let ret = {
                list:this.selected
            };
            this.$emit("input", ret);
            this.$emit("change", ret);
        },
        dataIn()
        {
            if( this.dataOuting ) {
                this.dataOuting = false;
                return;
            }
            console.log( "skulist", this.value);
            this.selected =this.value? this.value.list : [];
        }
    }
}
</script>

