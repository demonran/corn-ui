<style lang="less" scoped>
.warn{
  color:red;
  text-decoration: line-through;
}
</style>

<template>
    <span :class="{warn:expired}">{{config.text | Time}}</span>
</template>
<script>
function fmtt (ival) {
  let d = new Date(ival * 1000);
  let m = d.getMonth() + 1;
  let dt = d.getDate();
  // let h = d.getHours()
  // let mi = d.getMinutes(), s = d.getSeconds()
  function f (v) { return v < 10 ? '0' + v : v; };
  return `${f(m)}/${f(dt)}/${d.getFullYear()}`;
}

export default {
  props: ['config'],
  filters: {
    Time (val) {
      if (!val) return '';
      return fmtt(val);
    }
  },
  mounted () {
    console.log(this.config);
  },

  computed: {
    expired () {
      if (this.config.cell.expiredCheck) {
        let d = new Date(this.config.text * 1000);
        if (d.getTime() > Date.now()) return false;
        return true;
      }
      return false;
    }
  }
};
</script>
