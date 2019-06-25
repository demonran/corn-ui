<template>
  <XImg :src="src" :default-src="defaultSrc"  :offset="offset" :container="container"/>
</template>

<script>
import { XImg } from 'vux';

const img_default = require('../../../assets/img_default.jpg');

export default {
  components: {
    XImg
  },
  props: {
    src: {
      type: String
    },
    defaultSrc: {
      type: String,
      default: img_default
    },
    offset: {
      type: Number,
      default: -100
    },
    container: {
      type: String,
      default: 'window'
    }
  }
};
</script>
<style scoped>
.inficon{
    color: inherit;
    font-size: inherit;
}
</style>