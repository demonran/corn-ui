<template>
  <div class="tip">
    <ul class="list">
      <li :key="index" v-for="(item, index) in list">
        <span >{{item.date}}</span>
        <span >{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TipList',
  props: ['list']
};
</script>

<style lang="less" scoped>
  ul{
    padding:0;
    li{
      list-style: none;
    }
  }

</style>
