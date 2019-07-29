<template>
    <a @click="onClick">{{config.text}}</a>
</template>
<script>
export default {
  props: ['config'],
  methods: {
    onClick () {
      let config = this.config;
      if (config.cell) {
        config.cell.click(config.text, config.record, config.index, config.cell);
      }
    }
  }
};
</script>
