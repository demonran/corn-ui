<template>
  <div id="app">
    <router-view/>
    <div class="g-loading" v-if="showLoading">
        <span class="ant-spin-dot ant-spin-dot-spin"><i/><i/><i /><i /></span>
    </div>
  </div>
</template>

<script>
import enquireScreen from './utils/device';

export default {
  name: 'App',
  data () {
    return {
      showLoading: true
    };
  },
  created () {
    let _this = this;
    let Bus = window.Bus;
    enquireScreen(isMobile => {
      _this.$store.commit('setting/setDevice', isMobile);
    });
    Bus.$on('showLoading', () => {
      this.showLoading = true;
    });
    Bus.$on('hideLoading', () => {
      this.showLoading = false;
    });
    Bus.$on('Login401', () => {
      let fullPath = this.$route.fullPath;
      setTimeout(() => {
        this.$router.push('/login?from=' + fullPath);
      }, 100);
    });
  }
};
</script>

<style lang="less">
  body{
    overflow: hidden;
  }
  .ant-tabs-bar{
    margin-bottom: 0 !important;
  }

  .scroll {
    &::-webkit-scrollbar{
        width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 2px;
        background: gray;
    }
    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.2);
    }
  }

  :global{
    //拖拽控件全局样式
    .dragable-ghost{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    .dragable-chose{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    .dragable-drag{
      border: 1px dashed #aaaaaa;
      opacity: 0.65;
    }
    //页面切换动画
    .page-toggle-enter-active{
      transition: all 0.2s ease-in 0.25s;
    }
    .page-toggle-leave-active{
      transition: all 0.2s ease-out 0s;
    }
    .page-toggle-enter, .page-toggle-leave-to{
      opacity: 0;
      padding: 0px;
    }
  }
</style>
