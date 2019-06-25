<template>
  <div class="dbTable">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="dbTable.pageNum"
      :page-sizes="[20, 40, 60, 100]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dbTable.total">
    </el-pagination>

    <el-table :data="dataType=='out'?data : list">
        <el-table-column type="selection"  v-if="mulSel"></el-table-column>
        
        <el-table-column :type="item.type" v-for="(item,index) in colsData" :prop="item.prop" :label="item.label" :key="index" > 
            <template slot-scope="scope">
                {{
                   item.get?item.get(scope.row): scope.row[item.prop]
                }}
            </template>
        </el-table-column>
        
        <el-table-column label="操作" v-if="actionBtns">
             <template slot-scope="scope">
                <el-button v-for="name in actionBtns" :key="name" @click="onClickBtn(scope.row, name)"  type="text"  size="small">
                    {{name}}
                </el-button>
            </template>
        </el-table-column>
        
  </el-table>
 
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
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
  data () {
    return {
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
             ret.push({prop:key, label:key});
          }
          return ret;
       }
       for(let key in this.cols)
       {
           let colv = this.cols[key];
           let t = typeof colv;
           if(key == '_op') {
               
           } else if( t == 'string') {
               ret.push({prop:key, label:colv});
           } else if( Array.isArray(colv) ) {
               ret.push({prop:key, label:colv[0], get:colv[1]});
           }
       }
       return ret;
    }
  },
  methods:{
      ...mapActions("dbs",["getDbData","deleteRowByid"]),

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

</style>