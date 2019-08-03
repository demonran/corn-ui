<style lang="less" scoped>
</style>
<template>
    <div class='editable-row-operations'>
        <span v-for="(item,index) in btns" :key="item.label">
          
            <component  v-if="item.confirm"  :is="item.confirm.name" :key="item.label" 
            :config="{text:config.text, record:config.record, dbidField:config.dbidField, label:item.label, confirm:item.confirm}" >
              
            </component>
      
             <a  v-else @click="onClickItem(item)">{{item.label}}</a>

             <a-divider type="vertical" v-if="index != btns.length-1"/>
        </span>
    </div>
</template>
<script>


export default {
  props: ['config'],
  data()
  {
     return {
     }
  },
  computed: {
    btns () {
      return this.config.cell.btns;
    }
  },
  methods: {
    onClickItem (item) {
      let click = item.click;
      let {record, text} = this.config;
      click.call(this, record, text);
    },

    onClickConfirm (item) {
      this.onClickItem(item);
    }
  }
};
</script>
