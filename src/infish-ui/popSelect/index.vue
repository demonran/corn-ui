<template>
  <Popover class="pop-select" :placement="placement" >
    <div slot="content" class="select-list">
      <div class="list-item" v-for="(item, i) in data" :key="i" @click="select(item.value)">{{item.name}}</div>
    </div>
    <div class="select-text">
      <slot></slot>
    </div>
  </Popover>
</template>

<script>
import {Popover} from 'vux';

export default {
  components: {
    Popover
  },
  props: {
    placement: String,
    iconType: String,
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    select(value) {
      this.$emit('change', value);
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.pop-select{
  display:inline-block;

  
}

.vux-popover{
  background-color: #fff !important;
  .vux-popover-arrow-up{
    border-bottom-color: #fff !important;
  }
  .select-list{
    width: 1.8rem;
    border-radius: .08rem;
    box-shadow: 1px 1px 20px 0 rgba(0,0,0,0.1);
    .list-item{
      padding: .2rem;
      color: #595959;
      font-size: .24rem;
      &:not(:first-child){
        border-top: 0.01rem solid #F2F2F2;
      }
    }

  }
}
</style>