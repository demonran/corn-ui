<template>
  <scrollView :style="scrollStyle" @touchmove.stop="" @loadmore="loadmore" :offsetBot="offsetBot">
    <slot></slot>
  </scrollView>
</template>

<script>
import scrollView from "../scrollView/index";

export default {
  components: {
    scrollView 
  },
  props: {
    scrollBox: {
      type: String
    },
    offsetBot: {
      type: Number,
      default: 20
    }
  }, 
  data() {
    return {
      canScroll: false
    }
  },
  computed: {
    scrollStyle(){
      return `overflow: ${this.canScroll ?  'auto' : 'hidden'};`
    }
  },

  methods: {
    loadmore(loaded){
      this.$emit('loadmore', loaded);
    }
  },
  mounted() {
    this.Bus.$on('reachBottom_' + this.scrollBox, t => {
      this.canScroll = t == 1;
    })
  },
  destroyed() {
    
  }
};
</script>
<style lang="less" scoped>
  
</style>