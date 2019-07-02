<template>
  <a-layout>
    <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
      <sider-menu :theme="theme" :menuData="menuData" :collapsed="false" :collapsible="false" @menuSelect="onMenuSelect"/>
    </drawer>
    <sider-menu :theme="theme" v-else-if="layout === 'side'" :menuData="menuData" :collapsed="collapsed" :collapsible="true" />
    <a-layout class="layout-right">
      <div class="fixedheader" :class="{collapsed:collapsed,isMobile:isMobile}">
          <global-header :menuData="menuData" :collapsed="collapsed" @toggleCollapse="toggleCollapse"/>
      </div>

      <!-- <VuePerfectScrollbar class="scroll-area" v-once :settings="setting"> -->
      <a-layout-content :style="{height: '100vh',overflow:'auto', margin: '90px 24px 0'}" class="scroll">
        <slot></slot>
        <div style="padding: 0px">
          <global-footer :link-list="linkList" :copyright="copyright" />
        </div>
      </a-layout-content>
      <!-- </VuePerfectScrollbar> -->

    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import Drawer from '../components/tool/Drawer';
import SiderMenu from '../components/menu/SiderMenu';
import Setting from '../components/setting/Setting';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

const minHeight = window.innerHeight - 64 - 24 - 122;

let menuData = [];

export default {
  name: 'GlobalLayout',
  components: {Setting, SiderMenu, Drawer, GlobalFooter, GlobalHeader, VuePerfectScrollbar},
  data () {
    return {
      minHeight: minHeight + 'px',
      collapsed: false,
      menuData: menuData,
      showSetting: false,
      setting: {suppressScrollX: true}
    };
  },
  computed: {
    isMobile () {
      return this.$store.state.setting.isMobile;
    },
    theme () {
      return this.$store.state.setting.theme;
    },
    layout () {
      return this.$store.state.setting.layout;
    },
    linkList () {
      return this.$store.state.setting.footerLinks;
    },
    copyright () {
      return this.$store.state.setting.copyright;
    }
  },
  methods: {
    toggleCollapse () {
      this.collapsed = !this.collapsed;
    },
    onDrawerChange (show) {
      this.collapsed = show;
    },
    onMenuSelect () {
      this.toggleCollapse();
    },
    onSettingDrawerChange (val) {
      this.showSetting = val;
    }
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children;
  }
};
</script>

<style lang="less" scoped>
  .layout-right{
    overflow: hidden;
  }
  .setting{
    background-color: #1890ff;
    color: #fff;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  }
  .fixedheader{
    position: fixed;
    width: ~'calc(100% - 256px)';
    right: 0;
    top: 0;
    z-index: 1;

    &.collapsed {
      width: ~'calc(100% - 80px)';
    }
    &.isMobile{
      width: 100%;
    }
  }
  .scroll-area{
    // position: relative;
    height: 100vh;
    box-sizing: border-box;
    padding: 80px 14px 0;
    overflow-x: hidden;
  }
</style>
