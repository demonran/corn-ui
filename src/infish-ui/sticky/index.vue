<template>
  <div>
    <sticky ref="sticky" :check-sticky-support="false" :offset="offset">
      <tab
        class="sticky-tab"
        v-model="index"
        bar-active-color="rgba(218,35,55,.5)"
        :line-width="4"
        active-color="#2F2F2F"
        custom-bar-width=".7rem"
      >
        <tab-item
          :selected="index === item"
          v-for="(item, i) in tabs"
          @click="index = i"
          :key="i"
        >{{item}}</tab-item>
      </tab>
    </sticky>
    <div class="sticky-tab-space"></div>
    <swiper ref="swiper" :config="swiperConf" v-model="index">
      <slide v-for="(item, index) in tabs" :key="index">
        <slot :name="item"></slot>
      </slide>
    </swiper>
  </div>
</template>

<script>
import { Tab, TabItem, Sticky } from "vux";
import swiper from "../swiper";
import slide from "../swiper/slide";
import { setTimeout } from "timers";

export default {
  components: {
    Tab,
    TabItem,
    Sticky,
    swiper,
    slide
  },
  props: {
    tabs: Array,
    offset: Number
  },
  data() {
    return {
      index: 0,
      swiperConf: {
        autoHeight: true
      }
    };
  },
  watch: {
    index(newV, oldV) {
      if (newV != oldV) {
        this.$emit("change", newV);
        this.$refs.swiper.update();
      }
    }
  },
  methods: {
    init() {
      this.$refs.sticky.bindSticky();
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@height: 44px;
.sticky-tab-space{
  height: @height;
}

.sticky-tab.vux-tab-wrap {
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


</style>