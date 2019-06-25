<template>
  <load-more ref="loadMore" :show-loading="showLoading" :tip="tip"/>
</template>

<script>
import { LoadMore } from "vux";

export default {
  components: {
    LoadMore
  },
  props: {
    showLoading: Boolean,
    pagination: {
      type: Object,

    },
    offset: {
      type: Number,
      default: 44
    }
  },
  data() {
    return {
      isEnd: false,
      tip: '加载更多',
      scrollTop: 0,
      handleState: true
    };
  },
  // computed: {
  //   tip(){
  //     let { pageNum, pageSize, pages } = this.pagination;
  //     if(this.showLoading){
  //       return '加载中'
  //     }else if(pageNum * pageSize >= pages){
  //       this.isEnd = true;
  //       return '到底了'
  //     }else{
  //       this.isEnd = false;
  //       return '加载更多'
  //     }
  //   }
  // },
  watch: {
    pagination(newV){
      let { pageNum, pages } = newV;
      this.isEnd = false;
      if(this.showLoading){
        this.tip = '加载中'
      }else if(pageNum + 1 >= pages){
        this.isEnd = true;
        this.tip = '到底了'
      }else{
        this.isEnd = false;
        this.tip = '加载更多'
      }
    }
  },
  methods: {
    handleScroll() {
      if(this.isEnd) return;

      let a = getScrollTop(); //滚动条y轴上的距离
      let b = getWindowHeight(); //可视区域的高度
      let c = getScrollHeight(); //可视化的高度与溢出的距离（总高度）

      this.scrollTop = a;

      if (!this.timer) {
        this.timer = setInterval(this.isScrollEnd, 500);
      }
      // alert(JSON.stringify({a, b, c}));
      if (a + b >= c - this.offset) {
        if (this.handleState) {
          this.handleState = false;
          this.$emit("load");
        }
      }

      //滚动条在Y轴上的滚动距离
      function getScrollTop() {
        var scrollTop = 0,
          bodyScrollTop = 0,
          documentScrollTop = 0;
        if (document.body) {
          bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop =
          bodyScrollTop - documentScrollTop > 0
            ? bodyScrollTop
            : documentScrollTop;
        return scrollTop;
      }

      //文档的总高度
      function getScrollHeight() {
        var scrollHeight = 0,
          bodyScrollHeight = 0,
          documentScrollHeight = 0;
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight =
          bodyScrollHeight - documentScrollHeight > 0
            ? bodyScrollHeight
            : documentScrollHeight;
        return scrollHeight;
      }
      //浏览器视口的高度
      function getWindowHeight() {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
          windowHeight = document.documentElement.clientHeight;
        } else {
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      }
    },
    isScrollEnd() {
      let a1 = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scrollTop == a1) {
        this.handleState = true;
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  mounted() {
    document.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
.sticky-tab-content {
  height: calc(100vh - 44px);
  overflow: auto;
}
</style>