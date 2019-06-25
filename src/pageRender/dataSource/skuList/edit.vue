<style lang="less" scoped>
.item {
    display: flex;
    img{
        width: 80px;
        height: 80px;
    }
    .right {
        display: flex;
        flex-direction: column;
    }
}

</style>

<template>
<div>
    <el-button type="primary"  size="mini" @click="addSku">
        添加SKU
    </el-button>
    <div class="list">
        <div class="item" v-for="item in selected" :key="item.skuId">
            <img :src="item.skuImage" alt="">
            <div class="right">
                <span>名称：{{item.goodsName}}</span>
                <span>价格：{{item.price}}</span>
                <span>规格：{{item.spec}} {{item.spec}}</span>
                 <el-button type="primary"  size="mini" @click="addSku">删除</el-button>

            </div>
        </div>
    </div>
</div>    
</template>
<script>
import mix from "../../../screens/mix";

export default {
    mixins:[mix],
    data(){
        return {
            selected:[]
        }
    },

    methods:{
        async addSku()
        {
            let skus = await this.selectSku();
            console.log( skus );
            if( skus.length < 1) return;

            skus.forEach(sk => {
                if( this.selected.indexOf(sk) < 0) this.selected.push(sk);
            });
        }
    }
}
</script>

