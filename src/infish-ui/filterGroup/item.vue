<style lang="less" scoped>

</style>
<template>
    <div class="filterGroup">
      <slot></slot>
      <div v-if="selected" class="filterDrop" >
        <div class="drop-list" :style="`height: ${selected ? data.length * 0.88 : 0}rem`">
          <div class="list-item" v-for="(item, i) in data" :key="i" @click.prevent="choose(item.value)">{{item.name}}</div >
        </div>
      </div>
    </div>
</template>

<script>
import Item from "../../components/collocation/item";

export default {
  components: {
      
  },
  props:{
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  mounted() {
    
  }
};
</script>
