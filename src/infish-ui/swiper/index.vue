<template>
  <div :class="`swiper-container ${name} ${config.pagination ? 'hasPagination' : ''}`" ref="swiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <slot name="pagination">
      <div v-if="config.pagination" class="swiper-pagination"></div>
    </slot>
  </div>
</template>

<script>
import "./swiper.min.css";
const Swiper = require('./swiper.min.js').Swiper;

export default {
  model: {
    prop: 'index',
    event: 'change'
  },
  props: {
    index: Number,
    config: Object
  },
  data() {
    return {
      name: 'swiper_' + Date.now()
    };
  },
  watch: {
    index(newV,oldV) {
      if(newV !== oldV){
        this.mySwiper.slideTo(newV, 500, false);
      }
    } 
  },
  mounted() {
    let { pagination, ...conf } = this.config;
    if(pagination){
      conf.pagination = {
        el: ".swiper-pagination"
      }
    }
    if(!conf.width){
      conf.width = this.$refs.swiper.clientWidth;
    }
    let scope = this;
    conf.on = {
      slideChangeTransitionEnd: function() {
        if(scope.index >= 0){
          scope.$emit('change', scope.mySwiper.activeIndex);
        }
      }
    }
    this.mySwiper = new Swiper(`.${this.name}`, conf);
  },
  destroyed() {
    this.mySwiper && this.mySwiper.destroy();
  },
  methods:{
    slideTo(index){
      this.mySwiper.slideTo(index, 500, false);
    },
    jumpTo(index){
      this.mySwiper.slideTo(index, 0, false);
    },
    update(){
      this.mySwiper.update();
    }
  }
};
</script>

<style lang="less">
.swiper-container.hasPagination{
  padding-bottom: .3rem;

  .swiper-slide{
    max-width: 100%;
    img{
      max-width: 100%;
    }
  }

  .swiper-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: .3rem;
    bottom: 0;
    width: 100%;
    .swiper-pagination-bullet{
      width: .06rem;
      height: .06rem;
      border-radius: .03rem;
      background: rgb(188,188,188);

      &.swiper-pagination-bullet-active{
        background: #BCBCBC;
        width: .13rem;
      }
    }
  }
}

</style>