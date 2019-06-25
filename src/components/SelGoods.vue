<style lang="less" scoped>
 .image{
   width: 80px;
   height: 80px;
 }
</style>

<template>
    <div>
        <el-button @click="addGood" type="primary"  size="small" v-if="!disable">添加商品</el-button>
        <el-table :data="goods">
            <!-- <el-table-column type="selection"></el-table-column> -->
            <el-table-column  width="80" prop="goodsId" label="商品ID" ></el-table-column>
            <el-table-column  width="120" prop="imgUrls" label="商品图片">
                <template slot-scope="scope">
                    <img class="image" :src="scope.row.imgUrls" alt="">
                </template>
            </el-table-column>
            <el-table-column  width="220" prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column  width="120" prop="goodsNo" label="货号">
                <!-- <template slot-scope="scope">
                </template> -->
            </el-table-column>
    
            <el-table-column width="200" prop="lastModify" label="操作" v-if="!disable">
                <template slot-scope="scope">
                <el-button @click="deleteGoods(scope.row)" type="text"  size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex";
import comm from  "../screens/mix";

export default {
    mixins:[comm],

    props:{
        list:String,
        disable:{
            type:Boolean,
            default:false
        }
    },

    data(){
        return {
            goods:[],
        }
    },
    methods:{
        ...mapActions("goods",["getGoodsInfoById"]),

        deleteGoods(row) {
           let i = this.goods.indexOf(row);
           this.goods.splice(i, 1);
        },

        async addGood() {
            let selectd = await this.selectGoods();
            let n = selectd.length;
            if( n < 1) return;
        
            this.goods = this.goods.concat( selectd );
        },
    },
    computed:{
    },

    async mounted() {
        let ids = this.list;
        ids = ids?ids.split(","):[];

        if( ids.length < 1) return;

        let n = ids.length;

        for( let i=0; i<n; i++) {
            let goods = await this.getGoodsInfoById(ids[i]);
           if( goods ) {
               this.goods.push( goods );
           }
        }
    }
}
</script>
