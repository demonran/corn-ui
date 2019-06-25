<style lang="less" scoped>
.explain {
  padding: 0 .24rem 0.5rem .24rem;
  background: #fff;
  .title{
    height: 1rem;
    line-height: 1rem;
    color: #414141;
    font-size: .3rem;
    font-weight: 600;
  }
  .desc{
    display: block;
    color:#595959;
    font-size: .24rem;
    white-space: inherit;

  }
}
</style>
<template>
  <div class="explain">
    <div class="title">方案说明</div>
    <pre class="desc">{{data.desc}}</pre>
  </div>
</template>
<script>
export default {
  props:{
    data:{
      type:Object,
      required:true
    }
  },

  data() {
    return {
      info: {
        desc: ''
      }
    }
  }
};
</script>
