<style lang="less" scoped>
.image{
    width: 80px;
    height: 80px;
}
.op-row {
    margin: 4px 0;
}
.row{
    display: flex;
    align-items: center;
    margin: 2px 0;

    span{
        width: 50px;
        flex-shrink: 0;
    }
}
</style>

<template>
<div>
    SKU选择
    <div class="filters">
        <el-row :gutter="20">
            <el-col :span="5" class="row">
                <span>名称</span>
                 <el-input size="mini" v-model="name"></el-input>
            </el-col>
            <el-col :span="5" class="row">
                <span>货号</span>
                 <el-input size="mini" v-model="goodsNo"></el-input>
            </el-col>
            <el-col :span="5" class="row">
                 <span>关键词</span>
                 <el-input size="mini" v-model="keywords"></el-input>
            </el-col>
            <el-col :span="5" class="row">
                <span>品类</span>
                <el-select size="mini" v-model="categoryId" filterable  placeholder="请选择品类">
                    <el-option :label="item.name" :value="item.id" v-for="item in cateList" :key="item.id"></el-option>
                </el-select>
            </el-col>
            <el-col :span="4" class="row">
                <span>风格</span>
                <el-select size="mini" v-model="styleId" filterable  placeholder="请选择风格">
                    <el-option :label="item.name" :value="item.id" v-for="item in styleList" :key="item.id"></el-option>
                </el-select>
            </el-col>
         
         </el-row>
        
        <el-row :gutter="20">
            <el-col :span="5" class="row">
                <span>空间</span>
                <el-select size="mini" v-model="spaceId" filterable  placeholder="请选空间">
                    <el-option :label="item.name" :value="item.id" v-for="item in spaceList" :key="item.id"></el-option>
                </el-select>
            </el-col>

            <el-col :span="5" class="row">
                <span>状态</span>
                <el-select size="mini" v-model="sellingStatus" filterable  placeholder="请选状态">
                    <el-option label="未处理" :value="3"></el-option>
                    <el-option label="下架" :value="0"></el-option>
                    <el-option label="上架" :value="1"></el-option>
                </el-select>
            </el-col>
             <el-col :span="5" class="row">
                 <span>商品ID</span>
                 <el-input size="mini" v-model="goodsId"></el-input>
            </el-col>
            <el-col :span="9" class="row">
                <el-button  @click.native.prevent="cleanFilter" size="mini" type="primary">清空过滤</el-button>
                
                <el-button  @click.native.prevent="clickSearch" size="mini" type="primary">搜索</el-button>

                <el-button type="primary" size="mini" @click="onSubmit">确 定 {{selected.length> 0 ?selected.length:""}}</el-button>
            </el-col>
        </el-row>
        </div>

    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="dbgoods?dbgoods.pageNum:1"
            :page-sizes="[20, 40, 60, 100]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dbgoods?dbgoods.total:0">
        </el-pagination>
     <el-table :data="skus"  :span-method="objectSpanMethod" border @selection-change="selectChange" @row-dblclick="dblClickRow" @row-click="clickRow" ref="table">
      <el-table-column type="selection" width="34"></el-table-column>

      <el-table-column  prop="skuId"  label="SkuId" width="80"> </el-table-column>
      <el-table-column prop="skuImage"  label="图片">
          <template slot-scope="scope">
                <img :src="scope.row.skuImage"  class="image" alt="">
                </template>
      </el-table-column>
      <el-table-column prop="color"  label="颜色"> </el-table-column>
      <el-table-column prop="spec"  label="规格"> </el-table-column>
      <el-table-column prop="price"  label="价格"> </el-table-column>
      <el-table-column prop="goodsId"  label="商品ID"> </el-table-column>
      <el-table-column prop="goodsName"  label="商品名称"> </el-table-column>
      <el-table-column prop="goodsNo"  label="商品货号"> </el-table-column>
    </el-table>

    <div class="op-row">
        <el-button size="mini" type="primary" @click="onSubmit">确 定 {{selected.length> 0 ?selected.length:""}}</el-button>
    </div>
</div>
</template>

<script>
import comm from "../mix";
import { mapState,mapActions,mapGetters} from "vuex";

export default {

    props:{
        type:String
    },

    mixins:[comm],

    data() {
        return {
            selected:[],
            name:"",
            goodsNo:"",
            keywords:"",
            categoryId:"",
            styleId:"",
            spaceId:"",
            filters:"sellingStatus=1",
            goodsId :"",
            sellingStatus:1,
        }
    },
    computed:{
        ...mapState("goods", ["dbgoods"]),
        ...mapGetters("category",["cateList","styleList","spaceList"]),

        skus(){
          let ret = [];
          if( !this.dbgoods ) return ret;
        
          let list = this.dbgoods.list, n = list.length;
          for( let i=0; i<n; i++)
          {
              let goods = list[i], skuList= goods.skuList, k=skuList.length;
              for( let m=0; m<k; m++)
              { 
                  let sku = skuList[m];
                  ret.push({skuId:sku.skuId,price:sku.price, skuImage:sku.imgUrl?sku.imgUrl.split(",")[0]:"",color:sku.color,spec:sku.specification,
                            goodsId:goods.goodsId,goodsName:goods.goodsName,goodsNo:goods.goodsNo,span:m==0?k:0, goods:goods});
              }
          }
          return ret;
        }
    },
    watch:{
        filters(){
            console.log("xxx");
            this.loadData();
        }
    },
    methods:{
        ...mapActions("category",["QueryCategorylist"]),

        selectChange(rows) {
            this.selected = rows;
        },

        handleSizeChange(val) {
            this.loadData(undefined,val);
        },
        handleCurrentChange(val) {
            this.loadData(val,undefined);
        }, 
        ...mapActions('goods',["QueryGoodslist"]),

        onSubmit()
        {
            this.$emit("close");
        },
        getSelected(){
            return this.selected;
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 6 || columnIndex == 7 || columnIndex == 8) {
            return {
              rowspan: row.span,
              colspan: 1
            };
        }
      },

        loadData(index,size)
        {
            this.$nextTick(()=>{
                Bus.$emit("pauseAutoLoading");
                let  loading = this.showLoading();
                this.QueryGoodslist({index,size, query:this.filters}).then(()=>{
                    loading && loading.close();

                    Bus.$emit("resumeAutoLoading");
                })
            })
        },
        clickSearch()
        {
            let q = "";
            function hquery(v,k)
            {
                if(v === "") return;
                if( q === "") q = `${k}=${v}`;
                else q = `${q}&${k}=${v}`; 
            }
            hquery(this.name, "goodsName");
            hquery(this.goodsNo, "goodsNo");
            hquery(this.keywords, "keywords");
            hquery(this.categoryId, "categoryId");
            hquery(this.styleId, "styleId");
            hquery(this.spaceId, "areaId");
            hquery(this.sellingStatus, "sellingStatus");
            hquery(this.goodsId, "goodsId");

            this.filters = q;
        },

        cleanFilter()
        {
            this.name = "";
            this.goodsNo="";
            this.keywords="";
            this.categoryId="";
            this.styleId='';
            this.spaceId="";
            this.filters="sellingStatus=1";
            this.goodsId = ""
            this.sellingStatus=1
        },
        clickRow(row, event, column)
        {
            this.$refs.table.toggleRowSelection(row);
        },
        dblClickRow(row, event, column)
        {
            this.selected = [row];
            this.onSubmit();
        }
    },
    mounted(){
        if(this.skus.length < 1) this.loadData();
        this.QueryCategorylist();
    }

}
</script>
