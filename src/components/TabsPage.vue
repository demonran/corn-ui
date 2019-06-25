

<template>
  <div class="tabPages">
    <el-tabs v-model="tabIndex" type="card" @tab-remove="onRemoveTab">
        <el-tab-pane  v-for="(item) in opening" :key="item.name" :label="item.title" :closable="item.closable" :name="item.name"></el-tab-pane>
    </el-tabs>

    <div v-for="item in opening" :key="item.name" v-if="tabIndex==item.name">
        <component v-bind:is="item.comp" @close="onRemoveTab(item.name)"  @open="onOpen" :data="item.data" :type="item.type"></component>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

let gid = 1;

export default {
  props:{
    tabs:Array,
    index:String
  },

  components: {
    
  },

  data () {
    return {
      testTabs:[{
        comp:"colorList",
        type:"list",
        name:"颜色定义",
        closable:false,
      }],
      opening:[
        // {
          // type:"list",
          // name:'list',
          // comp:"colorList",
          // title:"",
          // id:"",
          // closable:false,
        // }
      ],
      tabIndex:''
    }
  },
  computed:{

  },
  methods:{
    openPage(type, data)
    {
      if( data == undefined ) data = {};

      if( data.id==undefined) data.id = gid++;
      
        let tabsDef = this.tabs, n = tabsDef.length,cfg=null;
        while(n--) {
           if(tabsDef[n].type == type) {
             cfg = tabsDef[n];
             break;
           }
        }
        if( !cfg ) return;
        
        this.open(cfg, data);
    },

    onOpen(type,id)
    {
       this.openPage(type, id);
    },
 
    open(cfg, data)
    {
        if( data == undefined ) data = {};

        if( data.id==undefined) data.id = gid++;

        let id = data.id;
        
        let opened = null;
        let openings = this.opening, n = openings.length;
        while(n--) {
           let open = openings[n];
           if(open.type == cfg.type && open.id == id)
           {
              opened = open;
              break;
           }
        }
        if( opened ) {
          this.tabIndex = opened.name;
          return;
        }
        let name = `${cfg.type}:${id}`;
        let closable = cfg.closable == undefined?true:cfg.closable;

        this.opening.push({type:cfg.type, name, 
                  title:id==0?cfg.name:`${cfg.name}(${id})`,
                  id,closable,data,
                  comp:cfg.comp
                  });

        this.tabIndex = name;
    },

    onRemoveTab(name)
    {
        let opening = this.opening,n=opening.length;
        while( n-- )
        {
           if( opening[n].name == name)
           {
              opening.splice(n,1);
              break; 
           }
        }

        if(this.tabIndex == name) {
          this.tabIndex = opening[n-1].name;
        }
    }
  },
  mounted()
  {
     let tabs = this.tabs,n=tabs.length;
     let firstTab = null,lastTab = null;

     for( let i=0; i<n; i++) {
        let tab = tabs[i];
        if( tab.closable ==  false ) {
             this.open(tab, {id:0});
             if( !firstTab )  firstTab = tab;
             lastTab = tab;
        }
     }
     if( firstTab != lastTab ){
        this.open(firstTab, {id:0});
     }
  }
}
</script>

<style lang="less" scoped>
  .tabPages{
    padding: 10px;
  }
</style>