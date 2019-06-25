
<style lang="less" scoped>
    .hiddenRow {
        display: none;
    }
    .searchForm{
        padding: 10px;
        span.label{
            margin-right: 10px;
        }
        span.attention{
            color: #e50021;
        }
    }
  .image {
    width: 80px;
    height: 80px;
  }
</style>

<template>
<div>
<el-table :data="dataType=='out'?data : treeGridData" border style="width: 100%;" @selection-change="selectChange">
     <el-table-column type="selection" width="34" v-if="selectable"></el-table-column>
      <el-table-column prop="id" label="类别ID" width="80" align="center"></el-table-column>
      <el-table-column label="类别名称" width="300" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <span :style="{marginLeft: scope.row.level * 23 + 'px'}">&ensp;</span>
          <i v-if="scope.row.children.length>0&&scope.row.showChildren" class="el-icon-arrow-down" @click="onExpand(scope.row)" :style="{cursor:scope.row.hasChildren ? 'pointer' : 'normal'}"></i>
          <i v-else-if="scope.row.children.length>0&&!scope.row.showChildren" class="el-icon-arrow-right" @click="onExpand(scope.row)" :style="{cursor:scope.row.children.length>0 ? 'pointer' : 'normal'}"></i>
          <span :data-level="scope.row.level" :style="{marginLeft: 4 + 'px'}">{{ scope.row.cName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cUrl" label="类别图片" width="80" align="center">
         <template slot-scope="scope">
            <img class="image" :src="scope.row.cUrl" alt="">
         </template>
      </el-table-column>
      <el-table-column prop="cCode" label="类别代码" width="80" align="center"></el-table-column>
      <el-table-column label="商品数量" align="left"></el-table-column>
      <el-table-column prop="addTime" label="添加时间" align="left"></el-table-column>
      <el-table-column label="操作" v-if="actions.length > 0">
         <template slot-scope="scope">
                <el-button v-for="item in actions" :key="item" @click="op(item, scope.row)"  type="text"  size="small">
                    {{item}}
                </el-button>
            </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
  import {mapState,mapActions,mapGetters,mapMutations} from "vuex";
  import Comm from "../../screens/mix";

  export default {
    mixins:[Comm],

    props:{
        dataType:{
            type:String,
            default:'in' 
        },
        data:{
            type:Array,
            default:()=>[]
        },
        actions:{
            type:Array,
            default:()=>[],
        },
        selectable:{
            type:Boolean,
            default: false
        }
    },

    components: {
    },
    data() {
      return {
        selected:[]
      }
    },
    computed: {
      ...mapState("category",["list"]),
      ...mapGetters('category',["treeGridData"]),
    },
    mounted()
    {
       if( this.dataType == 'in')
       {
           this.QueryCategorylist();
       }
    },

    methods: {
      ...mapActions("category",["QueryCategorylist","delete"]),
      ...mapMutations("category",["toggleRowShow"]),

      selectChange(rows) {
         this.selected = rows;
      },

      op(name,row)
      {
         this.$emit('onAction',{name,row});
      },
      onExpand(row) {
         this.toggleRowShow(row.id);
      },
    }
  };
</script>
