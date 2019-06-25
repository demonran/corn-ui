<template>
  <i :class="`iconfont inficon icon-${type}`">
    <span v-if="!!tag" class="inficon-tag">{{tag}}</span>
  </i>
</template>

<script>

export default {
  props: {
    type: String,
    tag: String
  }
};
</script>
<style scoped>
.inficon{
  display: inline-block;
  position: relative;
  color: inherit;
  font-size: inherit;
  line-height: 1;
}
.inficon::before{
  display: inline-block;
  line-height: 1;
}
.inficon-tag{
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  width: .3rem;
  height: .24rem;
  background: #FF8400;
  border: .02rem solid #fff;
  border-radius: .12rem;
  box-sizing: border-box;
  text-align: center;
  line-height: .2rem;
  color: #fff;
  font-size: .16rem;
  margin-right: -.15rem;
  margin-top: -.12rem;

}
</style>