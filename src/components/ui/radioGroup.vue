
<style lang="less" scoped>
.ui-radiogroup {
    display: flex;
    align-items: center;
}
</style>

<template>
    <div class="ui-radiogroup">
        <span v-if="config.label">{{config.label}}</span>
        <a-radio-group name="radioGroup" v-model="selected" @change="handleSortChange">
            <a-radio 
                :value="option.value" 
                v-for="option in selectOptions" 
                :key="option.value">{{option.label}}</a-radio>
        </a-radio-group>
    </div>
</template>

<script>
import http from '@/services/http';
import mock from '@/services/mockHttp';

export default {
  props: ['config', 'value'],
  data () {
    return {
      selected:''
    };
  },
 
  computed:{
     selectOptions(){
        if( this.config.dataS ) {
           return this.config.dataS;
        }
        return []
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
      if(this.config.initVal)  {
          this.selected = this.config.initVal;
      }
      if(this.value != undefined )
      {
          this.selected = this.value;
      }
  },

  methods: {
    handleSortChange () {
      this.$emit('change', this.selected);
    }
  }
};
</script>
