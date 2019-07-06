<style lang="less" scoped>
.time-range {
    display: flex;
    justify-content:space-between;
    position: relative;
    align-items: center;
    .time-picker{
        width: 45%;
    }
}
</style>

<template>
    <div class="time-range">
        <a-time-picker format="HH:mm" class="time-picker" v-model="start" @change="rangChagne"/>
        <span>-</span>
        <a-time-picker format="HH:mm" class="time-picker" v-model="end" @change="rangChagne"/>
    </div>
</template>
<script>

import moment from 'moment';
export default {
  props: {
    value: Object
  },
  data () {
    return {
      start: moment('09:00', 'HH:mm'),
      end: moment('18:00', 'HH:mm')
    };
  },
  created () {
    if (this.value) {
      this.start = moment(this.value.start, 'HH:mm');
      this.end = moment(this.value.end, 'HH:mm');
    }
  },
  watch: {
    value (val = {}) {
      let start = this.start.format('HH:mm');
      let end = this.end.format('HH:mm');
      if (val.start !== start) this.start = moment(val.start, 'HH:mm');
      if (val.end !== end) this.end = moment(val.end, 'HH:mm');
    }
  },
  methods: {
    rangChagne () {
      console.log();
      let start = this.start.format('HH:mm');
      let end = this.end.format('HH:mm');
      if (!this.value || this.value.start != start || this.value.end != end) {
        this.$emit('change', {start, end});
      }
    }
  }
};
</script>
