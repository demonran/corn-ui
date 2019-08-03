<style lang="less" scoped>
.ui-date {
    display: flex;
    align-items: center;
    span{
      flex-shrink: 0;
      margin: 0 4px;
    }
}
</style>

<template>
    <div class="ui-date">
        <span v-if="config.label">{{config.label}}</span>
        <a-date-picker @change="handleChange" v-model="dateVal"/>
    </div>
</template>

<script>
import moment from 'moment';
export default {
  props: {
    config: Object,
    value: String
  },
  data () {
    return {
      dateVal: null,
    };
  },
  created () {
      if( this.value )
      {
          this.dateVal = moment(this.value, 'YYYY-MM-DD');
      }
  },
  watch: {
    value () {
       this.dateVal = moment(this.value, 'YYYY-MM-DD');
    }
  },
  methods: {
    handleChange () {
        let date = this.dateVal.format('YYYY-MM-DD');
        if( date != this.value )
        {   
            this.$emit('change', date);
            this.$emit('input', date);
        }
    }
  }
};
</script>
