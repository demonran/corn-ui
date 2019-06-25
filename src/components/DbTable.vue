<template>
  <div class="dbTable">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="dbTable.pageNum"
      :page-sizes="[20, 40, 60, 100]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dbTable.total" v-show="showPage">
    </el-pagination>

    <el-table :data="dbTable.list" @selection-change="selectChange" stripe @row-dblclick="dblClickRow" @row-click="clickRow" ref="table">
        <el-table-column type="selection"  v-if="mulSel"></el-table-column>
        
        <el-table-column :type="item.type" :filters="item.filters" :filter-method="item.filterfn"  :width="item.width?item.width:''" v-for="(item,index) in colsData" :prop="item.prop" :label="item.label" :key="index" > 
            <template slot-scope="scope">
                
                <div v-if="item.t == 'txt'">
                    <el-popover
                        v-if="item.editable"
                        placement="top"
                        width="160"
                        @show="onEditTipShow(scope.row, item.prop)"
                        v-model="scope.row._editing">
                        <el-input size="small" class="form-item" v-model="editing"></el-input>
                        <div style="text-align: right; margin: 0">
                          <el-button size="mini" type="text" @click="scope.row._editing = false">取消</el-button>
                          <el-button type="primary" size="mini" @click="onSubmitEdit(scope.row,item.prop)">确定</el-button>
                        </div>
                        <span class="clickable" slot="reference">{{item.get?item.get(scope.row): scope.row[item.prop]}}</span>
                    </el-popover>
                    <span v-else>
                    {{
                        item.get?item.get(scope.row): scope.row[item.prop]
                    }}
                    </span>
                </div>
              
                <span v-if="item.t == 'time'">
                 {{
                     item.get?item.get(scope.row): scope.row[item.prop] | Time
                 }}
                </span>

                <img class="img-item" :src="item.get?item.get(scope.row): scope.row[item.prop]" alt="" v-if="item.t=='img'">
            </template>
        </el-table-column>
        
        <el-table-column label="操作" v-if="actionBtns">
             <template slot-scope="scope">
                <el-button v-for="name in actionBtns" :key="name" @click.stop="onClickBtn(scope.row, name)"  type="text"  size="small">
                    {{name}}
                </el-button>
            </template>
        </el-table-column>
  </el-table>
 
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import mix from "../screens/mix";

export default {
  mixins:[mix],

  props:{
    dbName:String,//数据表名称,
    cols:Object,//数据列表字段
    id:String,
    query:String,
    showPage:{
      type:Boolean,
      default:true
    },
    mulSel:{
        type:Boolean,
        default:false
    }
  },

  components: {
  
  },
  watch:{
    query() {
       if( this.prequery != this.query ) {
          this.prequery = this.query;
          this.getDbData({name:this.dbName,query:this.query,index:1});
       }
    }
  },
  data () {
    return {
      selected:[],
      prequery:"",
      editing:"",
    }
  },
  computed:{
    ...mapState("dbs",["dbs"]),
    dbTable()
    {   
        let dbs = this.dbs,n=dbs.length;
    
        let ret = {pageSize:0,pageNum:1, pages:0, list:[], total:0};
        let db = null;
        while(n--) {
          db = dbs[n]
          if( db.name == this.dbName ) {
              break;
          }
        }
        if( db ) {
            ret = db;
        }
        return ret;
    },
    actionBtns(){
       let btns = null;
       for(let key in this.cols) {
           if( key == '_op') btns = this.cols['_op'];
       }
       return btns;    
    },

    colsData()
    {
        let ret = [];
       if(!this.cols) { //如果没有配置列，列出所有字段
          let data1 = this.dbTable.list[0];
          for( let key in data1){
             ret.push({prop:key, label:key,t:'txt'});
          }
          return ret;
       }
       for(let key in this.cols)
       {
           let colv = this.cols[key];
           let t = typeof colv;
           if(key == '_op') {
               
           } else if( t == 'string') {
               ret.push({prop:key, label:colv,t:'txt'});
           } else if( Array.isArray(colv) ) {
               ret.push({prop:key, label:colv[0], get:colv[1],t:'txt'});
           } else { //object
               let filterfn = colv.filters?(colv.filterfn?colv.filterfn:this.filterTag):null;
               ret.push({prop:key,editable:colv.editable,label:colv.label, get:colv.getfn,t:colv.type, width:colv.width,filters:colv.filters?colv.filters:null, filterfn});
           }
       }
       return ret;
    }
  },
  methods:{
      ...mapActions("dbs",["getDbData","deleteRowByid","updateRow"]),
      onEditTipShow( row , prop)
      {
         this.editing = row[prop];
      },
      async onSubmitEdit(row, prop)
      {
          let error = await this.updateRow({name:this.dbName, row: {goodsId:row.goodsId,score:this.editing}});
          if( error )
          {
             this.toast( error, true);
             row._editing = false;
             return;
          }
          row[prop] = this.editing;
          row._editing = false;
          this.toast("修改成功");
      },

      filterTag(value, row) {
        return row.tag === value;
      },
      selectChange(sels)
      {
         this.selected = sels;
      },

      onClickBtn(row, name) {
         this.$emit("onOp",name,row);

        if(name == "删除")
        {
            this.delete(row[this.id]);
        }
      },

      delete( id )
      {
          this.$confirm('删除Id为,'+id+"的数据", '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            
            this.deleteRowByid({name:this.dbName, id}).then((error)=>{

                if( !error ) {
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                } else {
                    this.$message({
                    type: 'error',
                    message: error
                  });
                }
               
            })

          }).catch(() => {
            
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });

          
      },

      handleSizeChange(val) {
        this.getDbData({name:this.dbName,size:val,query:this.query});
      },

      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getDbData({name:this.dbName,index:val,query:this.query});
      },

      clickRow(row, event, column)
      {
          this.$refs.table.toggleRowSelection(row);
      },

      dblClickRow(row, event, column)
      {
          this.selected = [row];

          this.$emit("row-dblclick");
      }

  },
  mounted()
  {
     console.log( this.query ,"----", this.dbName);
     this.getDbData({name:this.dbName,query:this.query});
  }

}
</script>

<style lang="less" scoped>
.img-item{
  width: 80px;
  height: 80px;
  object-fit: contain;
}
.clickable{
  cursor:pointer;
  color: #66b1ff;
}
</style>