<template>
 <a-locale-provider :locale="local">
  <div id="app">
    <router-view/>
    <div class="g-loading" v-if="showLoading">
        <span class="ant-spin-dot ant-spin-dot-spin"><i/><i/><i /><i /></span>
    </div>
  </div>
  </a-locale-provider>
</template>

<script>
import enquireScreen from './utils/device';
import zh from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'App',
  data () {
    return {
      showLoading: false,
      local: zh
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

  .g-loading{
     background-color: rgba(0, 0, 0, 0.4);
     position: fixed;
     display: flex;
     justify-content: center;
     align-items: center;
     width: 100vw;
     height: 100vh;
     left: 0;
     top: 0;
     z-index: 2000;
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
