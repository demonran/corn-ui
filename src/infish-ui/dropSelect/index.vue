<template>
<div class="dropSelect" @click="trigger">
  <div class="dropSelect-text">
    <slot></slot>
    <icon :type="rightIcon"/>
  </div>
  <div v-if="selected" class="dropSelect-drop" >
    <div class="drop-list" :style="`height: ${selected ? data.length * 0.88 : 0}rem`">
      <div class="list-item" v-for="(item, i) in data" :key="i" @click.prevent="choose(item.value)">{{item.name}}</div >
    </div>
  </div>
</div>


</template>

<script>
import icon from "../icon"

export default {
  components: {
    icon
  },
  props: {
    rightIcon: String,
    data: {
      type: Array,
      default: []
    }
  },
  data(){
    return {
      selected: false
    }
  },
  methods: {
    blur(){
      this.selected = false;
    },
    trigger(){
      this.selected = !this.selected;
    },
    choose(){
      console.log('dddd');
    }
    // select(value) {
    //   this.$emit('change', value);
    // }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.dropSelect{
  .dropSelect-text{
    text-align: center;
    line-height: .88rem;
    color: #595959;
  }

  .dropSelect-drop{
    margin-top: 1px;
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    background: rgba(0,0,0,.5);
    .drop-list{
      background: #fff;
      padding-left: .2rem;
      transition: height .3s ease;
      overflow: hidden;
      .list-item{
        height: .88rem;
        line-height: .88rem;
        &:not(:first-child){
          border-top: 0.01rem solid #F4F4F4;
        }
      }
    }
  }
  
}
</style>