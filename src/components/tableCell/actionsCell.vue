<style lang="less" scoped>
</style>
<template>
    <div class='editable-row-operations'>
        <span v-for="(item,index) in btns" :key="item.label">

            <component  v-if="item.confirm"  :is="item.confirm.name" :key="item.label"
            :config="{text:config.text, record:config.record, dbidField:config.dbidField,dbname:config.dbname, label:item.label, confirm:item.confirm}" >
                <!-- <a>{{item.label}}</a> -->
            </component>

             <a  v-else @click="onClickItem(item)">{{item.label}}</a>

             <a-divider type="vertical" v-if="index != btns.length-1"/>
        </span>
    </div>
</template>
<script>

export default {
  props: ['config'],
  data () {
    return {
    };
  },
  computed: {
    btns () {
      return this.config.cell.btns;
    }
  },
  methods: {
    onClickItem (item) {
      console.log( item );
      let click = item.click;
      let {record, text} = this.config;
      click.call(this,text,record);
    },

    onClickConfirm (item) {
      this.onClickItem(item);
    }
  }
};
</script>