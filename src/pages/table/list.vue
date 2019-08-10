
<style lang="less" scoped>
</style>
<template>
  <list :config="config" :route="route" :dbname="dbname" :dbid="dbid" :cols="cols"/>
</template>

<script>
import list from './listContent';

export default {
  components: {list},
  props: ['config', 'route', 'dbname', 'dbid', 'cols'],
};
</script>
