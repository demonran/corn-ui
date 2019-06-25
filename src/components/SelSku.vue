<style lang="less" scoped>
 .image{
   width: 80px;
   height: 80px;
 }
</style>

<template>
    <div>
        <el-button @click="addGood" type="primary"  size="small" v-if="!disable">添加SKU</el-button>
        <el-table :data="addedGoods">
            <!-- <el-table-column type="selection"></el-table-column> -->
            <el-table-column  width="80" prop="skuId" label="skuId" ></el-table-column>
            <el-table-column  width="120" prop="image" label="商品图片">
                <template slot-scope="scope">
                    <img class="image" :src="scope.row.image" alt="">
                </template>
            </el-table-column>
            <el-table-column  width="220" prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column  width="120" prop="price" label="原价（元）">
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
        skus:{
            type:Array,
            default:[],
        },
        disable:{
            type:Boolean,
            default:false
        }
    },

    data(){
        return {
            goods:[],
            sels:[],
        }
    },
    methods:{
        ...mapActions("goods",["getGoodsInfoById"]),

        deleteGoods(row) {
            let skuId = row.skuId;
            let proms = this.skus, n = proms.length;
            while(n--) {
                if(proms[n].skuId == skuId) {
                    proms.splice(n,1);
                    break;
                }
            }
        },
        async addGood() {
            let skus = await this.selectSku();
            let n = skus.length;
            let proms = this.sels.slice(0);

            for(let i=0; i<n; i++)
            {
                let sku = skus[i];
                if( !this.goods[sku.goodsId] ) {
                    this.goods[sku.goodsId] = sku.goods;
                    
                    let klist = sku.goods.skuList,m=klist.length;
                    let kmap = {};
                    while(m--) kmap[klist[m].skuId] = klist[m];
                    sku.goods.skuList = kmap;
                }

                proms.push({goodsId:sku.goodsId,skuId:sku.skuId});
            }
            this.sels = proms;
        },
    },
    computed:{
        addedGoods(){
        let skus = this.sels, n= skus.length, goods = this.goods;
            let ret = [];
            for( let i=0; i<n; i++) {
                let item = skus[i];

                let g = goods[item.goodsId];
                if( !g ) continue;

                let img = g.imgUrls;
                let sku = g.skuList[item.skuId];

                if( sku.imgUrl ) {
                    img = sku.imgUrl.split(",")[0];
                }
                ret.push({skuId:item.skuId, image:img, goodsName:g.goodsName,price:sku.price});
            }
            return ret;
        }
    },
    async mounted() {
        this.sels = this.skus;

        let promGoods = this.sels, n = promGoods.length;
        let ret = {};

        for( let i=0; i<n; i++) {
            let goods = await this.getGoodsInfoById(promGoods[i].goodsId);
            if( goods ) {
                ret[goods.goodsId] =  goods;

                //sku改为map
                let skuList = goods.skuList, k=skuList.length,skus={};
                while(k--){
                    skus[skuList[k].skuId] = skuList[k];
                }
                goods.skuList = skus;
            }
        }
        this.goods = ret;
    }
}
</script>
