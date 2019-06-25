<template>
  <div class="sticky-tabs">
    <tab class="sticky-tab"
        v-model="index"
        bar-active-color="rgba(218,35,55,.5)"
        :line-width="4"
        active-color="#2F2F2F"
        custom-bar-width=".7rem">
        <tab-item :selected="index === item"
            v-for="(item, i) in tabs"
            @click="index = i"
            :key="i">
            {{item}}
        </tab-item>
    </tab>
    <swiper class="sticky-swiper" ref="swiper" :config="swiperConf" v-model="index">
      <slide v-for="(item, index) in tabs" :key="index">
        <stickyScroll class="sticky-scroll" :scrollBox="scrollBox" @loadmore="loadmore">
          <slot :name="item"></slot>
        </stickyScroll>
      </slide>
    </swiper>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
import swiper from "../swiper";
import slide from "../swiper/slide";
import stickyScroll from "./stickyScroll";
import { setTimeout } from "timers";

export default {
  components: {
    Tab,
    TabItem,
    swiper,
    slide,
    stickyScroll
  },
  props: {
    scrollBox: String,
    tabs: Array,
    offset: Number
  },
  watch: {
    index(to, from){;
      if(to != from){
        this.$emit('change', this.index);
      }
    }
  },
  data() {
    return {
      index: 0,
      loadStates: {},
      swiperConf: {}
    };
  },
  methods: {
    loadmore(loaded){
      this.$emit('loadmore', loaded)
    },
    initSwiper(){
      this.$refs.swiper.mySwiper && this.$refs.swiper.mySwiper.update();
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@height: 44px;
.sticky-tabs{
  height: 100%;
}
.vux-tab-wrap {
  padding-top: 0;
  .vux-tab-container {
    height: @height;

    .vux-tab {
      height: @height;
      .vux-tab-item {
        flex-basis: 18%;
        line-height: @height;
        background: none;
        &.vux-tab-selected {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }

    .vux-tab-ink-bar{
      bottom: 12px;
    }
  }
}
.sticky-swiper{
  height: calc(~'100% - 44px')
}
.sticky-scroll{
  height: 100%;
}
</style>