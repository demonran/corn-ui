
<style lang="less" scoped>
.keyword-input{
  width: 180px;
}
.row-deal-img {
    width: 60px;
    height: 60px;
    background-color: gray;
    object-fit: cover;
}
.original-price{
  text-decoration: line-through;
}
.extra-op{
  display: flex;
}
.warning{
  color:red;
  text-decoration: line-through;
}

</style>

<template>
    <div>
        <tablePage :db="{name:dbname,id:dbid} " :key="dbname"
            :table="tableColsDef"
            :actionDel="config?config.tableActionDel:false" 
            :actionDetail="config?config.tableActionDetail:false"
            :actions="actionsDef"
             @pageChange="pageChange"
            :search="searchDefs"
        >
        </tablePage>
    </div>

</template>

<script>
import tablePage from '../../layouts/tableView';

// import { mapState, mapActions } from 'vuex';
import mix from '../mix';

export default {
  mixins: [mix],
  components: {tablePage},
  props: ['config', 'route', 'dbname', 'dbid', 'cols'],

  data () {
    return {
    };
  },
  computed: {
    tableColsDef () {
      // let tableCols = this.config.tableCols;
      let cols = this.cols;
      if( !cols ) return [];

      let ret = [];
      cols.forEach(item => {
        if (item.listTable) {
          ret.push({ ...this.getObjVal(item.name, 'dataIndex', 'title'),

            ...item.listTable
          });
        }
      });
      return ret;
    },
    searchDefs ()
    {
        if(!this.config || !this.config.search ) return [];

        let items = [];
        let searchs = this.config.search.list;
        
        let n = searchs.length;
        for(let i=0; i<n; i++)
        {
            let cfg = searchs[i];
            let itemCfg = this.getObjVal(cfg.name,'name','label');
            let ui = {name:''};
            if( typeof cfg.ui == 'string') {
              ui.name = cfg.ui;
            } else {
              ui = cfg.ui;
            }
            items.push({...itemCfg, ui, value:null});
        } 
        return items;
    },
    actionsDef()
    {
      if(!this.config || !this.config.actions ) return [];

        let items = [];
        let actions = this.config.actions.list;
        
        let n = actions.length;
        for(let i=0; i<n; i++)
        {
            let cfg = actions[i];
            let item = {name:'',click:null};
            if( typeof cfg == 'string') {
               item.name = cfg;
            } else {
              item.name = cfg.name;
              item.click = cfg.click;
            }
            items.push(item);
        }
        return items;
    }
  },
  mounted () {
    window.Bus.$on('pageChange',(name, params)=>{
       this.pageChange(name, params);
    })
  },
  destroyed(){
    window.Bus.$off('pageChange');
  },
  
  methods: {
    pageChange (name, params) {
      
      let route = null;
      let n = this.route.length;
      while(n--)
      {
        if( this.route[n].component == name )
        {
           route = this.route[n];
           break;
        }
      }
      if (!route) return;

      this.$router.push({name: route.name, params});
    },
    getObjVal (obj, name1, name2) {
      let ret = {};
      if (typeof obj == 'string') {
        ret[name1] = obj;
        ret[name2] = obj.charAt(0).toUpperCase() + obj.slice(1);
        return ret;
      }
      let keys = Object.keys(obj);
      ret[name1] = keys[0];
      ret[name2] = obj[keys[0]];
      return ret;
    }
  }
};
</script>
