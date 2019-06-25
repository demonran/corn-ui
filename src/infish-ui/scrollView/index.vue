<template>
  <div class="scroll_root" ref="refScrollView" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="scroll-content" ref="refScrollContent">
      <div class="refresh" v-if="needRefresh" :style="refreshStyle">
        <div class="refresh-text">{{refreshTip}}</div>
      </div>
      <div class="scroll-content-view">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: null
    },
    scrollBox: {
      type: String,
      default: null
    },
    refreshStyle: {
      type: String,
      default: 'margin-top: -.88rem'
    },
    offsetTop: {
      type: Number,
      default: 80
    },
    offsetBot: {
      type: Number,
      default: 0
    }
  }, 
  data() {
    return {
      needRefresh: !!this._events['refresh'],
      needLoadmore: !!this._events['loadmore'],
      endTimer: null,
      scrollTop: 0,
      offset: 0,
      refreshState: 0,
      loadmoreState: 0,
      progess: 0,
    }
  },

  computed: {
    refreshTip(){
      switch(this.refreshState){
        case 0: return '下拉刷新';
        case 1: return '下拉刷新';
        case 2: return '加载中';
      }
    }
  },

  methods: {
    touchStart(e){ 
      this.startMoveY = e.touches[e.touches.length - 1].clientY;
      this.clientHeight = this.$refs.refScrollView.clientHeight;
      this.scrollHeight = this.$refs.refScrollView.scrollHeight;
    },

    touchMove(e){
      if(!this.needRefresh || this.loadState == 1 || this.refreshState == 2) return;
      let currentY = e.touches[e.touches.length - 1].clientY;

      this.offset = currentY - this.startMoveY;

      // 判断是否下拉刷新
      if(this.scrollTop == 0 && this.offset > 0){
        e.preventDefault();
        this.transformY(this.offset * 0.5, 0);
        this.refreshState = this.offset > this.offsetTop ? 1 : 0;
      }
    },

    touchEnd(){
      // 向上滑动
      if(!this.needRefresh) return;
      
      if(this.offset > 0){
        if(this.refreshState == 1){
          this.transformY(60, 300);
          this.refreshState = 2;
          this.$emit('refresh', this.loaded);
        }else{
          this.transformY(0, 300);
        }
      }
    },

    transformY(offset, duration = 0){
      this.offset = offset
      this.refScrollContent.style = `transform:translateY(${offset}px);transition-duration: ${duration}ms;`
    },

    handleScroll(){
      this.scrollTop = this.refScrollView.scrollTop;
      
      if(this.id){
        this.Bus.$emit('scroll_' + this.id, this.scrollTop);
      }

      // 当滑动到底部时或从底部划走时触发事件
      let progess = this.scrollTop / (this.scrollHeight - this.clientHeight);
      if((progess == 1 || this.progess == 1) && (this.progess = progess)){
        this.$emit('reachBottom', progess);
        if(this.id){
          this.Bus.$emit('reachBottom_' + this.id, progess);
        }
      }
    
      // 当可以加载更多时
      if(this.needLoadmore && this.refreshState == 0 && this.loadmoreState == 0){
        if(this.scrollTop + this.clientHeight >= this.scrollHeight - this.offsetBot){
          this.loadmoreState = 1;
          this.$emit('loadmore', this.loaded)
        }
      }
    },

    // 刷新 | 加载更多 的回调接口
    loaded(){
      if(this.refreshState > 0){
        this.transformY(0, 300);
      }
      this.loadmoreState = this.refreshState = 0;
    }

  },
  mounted() {
    this.refScrollView = this.$refs.refScrollView;
    this.refScrollContent = this.$refs.refScrollContent;
    
    this.refScrollView.addEventListener('scroll', this.handleScroll);
  },
  destroyed(){
    this.refScrollView.removeEventListener('scroll', this.handleScroll)
  }
};
</script>
<style lang="less" scoped>
  .scroll_root{
    overflow: auto;
    -webkit-overflow-scrolling: touch; 
    font-size: 14px;
     &::-webkit-scrollbar {
      display:none
    }
  }
  
  .scroll-content{
    position: relative;
    // transition-duration: .2s;
  }
  .scroll-content-view{
    &::before{
      content: '';
      display: block;
      height: 0;
      clear:both;
    }
  }
  .refresh{
    position: absolute;
    width: 100%;
    height: .88rem;
    margin-top: -.88rem;
    line-height: .88rem;
    text-align: center;
  }
</style>