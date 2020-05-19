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
      <div :style="{height: '100vh',overflow:'auto', padding: '82px 24px 0'}" class="scroll">
        <transition name="page-toggle">
          <keep-alive v-if="multipage">
            <div class="app-container">
              <router-view />
            </div>

          </keep-alive>
          <router-view v-else />
        </transition>
        <div style="padding: 0px">
          <global-footer :link-list="[]" :copyright="copyright" />
        </div>
      </div>
      <!-- </VuePerfectScrollbar> -->
    </a-layout>
  </a-layout>
</template>

<script>

import Contextmenu from '../components/menu/Contextmenu';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import Drawer from '../components/tool/Drawer';
import SiderMenu from '../components/menu/SiderMenu';
import Setting from '../components/setting/Setting';

let menuData = [];

export default {
  name: 'MenuView',
  components: {Contextmenu, GlobalHeader, GlobalFooter, Drawer, SiderMenu, Setting},
  data () {
    return {
      menuVisible: false,
      menuItemList: [
        { key: '1', icon: 'arrow-left', text: '关闭左侧' },
        { key: '2', icon: 'arrow-right', text: '关闭右侧' },
        { key: '3', icon: 'close', text: '关闭其它' }
      ],
      collapsed: false,
      menuData: menuData,
      showSetting: false,
      setting: {suppressScrollX: true}
    };
  },
  computed: {
    multipage () {
      return this.$store.state.setting.multipage;
    },
    isMobile () {
      return this.$store.state.setting.isMobile;
    },
    theme () {
      return this.$store.state.setting.theme;
    },
    layout () {
      return this.$store.state.setting.layout;
    },

    copyright () {
      return this.$store.state.setting.copyright;
    }
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children;
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
  }
};
</script>

<style  lang="less" scoped>
  .layout-tabs{
    width: 100%;
    background-color: #f0f2f5;
    position: relative;
    top: -4px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
  .ant-tabs-bar{
    margin: 0 !important;
  }

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
    width: ~'calc(100% - 180px)';
    right: 0;
    top: 0;
    z-index: 10;

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
  //main-container全局样式
  .app-container {
    padding: 20px 20px 45px 20px;
  }
</style>
