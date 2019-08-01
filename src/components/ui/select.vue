<style lang="less" scoped>
.ui-select {
    display: flex;
    align-items: center;
}
</style>

<template>
    <div class="ui-select">
        <span v-if="config.label">{{config.label}}</span>
        <a-select :showSearch="true" :loading="loading" v-model="selected" :style="{width:config.width}" @change="handleSortChange">
            <a-select-option v-for="(option) in selectOptions"
                :key="option.value" :value="option.value">
                {{
                    option.label
                }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script>
import http from '@/services/http';
import mock from '@/services/mockHttp';

export default {
  props: ['config', 'value'],
  data () {
    return {
      selected: -1,
      remoteOptions:[],
      loading:false
    };
  },
  computed:{
     selectOptions(){
        if( this.config.dataS.array ) {
           return this.config.dataS.array;
        }
        return this.remoteOptions;
     }
  },
  watch: {
    value () {
      if (this.value != this.selected) {
        this.selected = this.value;
      }
    }
  },
  created () {
    this.selected = this.value;
    let remote = this.config.dataS.remote;
    if( remote ) {
       this.loading = true;
       let httpObj = remote.debug?mock:http;
       httpObj.get(remote.url).then(ret=>{
          if( ret.errorNo == 200 ) {
             this.loading = false;
             this.remoteOptions = ret.result.content.map(remote.filter);
          }
       })
    }
  },

  methods: {
    handleSortChange () {
      this.$emit('change', this.selected);
    }
  }
};
</script>
