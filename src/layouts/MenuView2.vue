<template>
  <a-layout>
    <drawer v-if="isMobile" :openDrawer="collapsed" @change="onDrawerChange">
      <sider-menu :theme="theme" :menuData="menuData" :collapsed="false" :collapsible="false" @menuSelect="onMenuSelect"/>
    </drawer>
    <sider-menu :theme="theme" v-else-if="layout === 'side'" :menuData="menuData" :collapsed="collapsed" :collapsible="true" />
    <a-layout class="layout-right">
      <div class="fixedheader" :class="{collapsed:collapsed,isMobile:isMobile}">
        <global-header :menuData="menuData" :collapsed="collapsed" @toggleCollapse="toggleCollapse"/>
        <contextmenu :itemList="menuItemList" :visible.sync="menuVisible" @select="onContentMenuSelect" />
        <a-tabs
          @contextmenu.native="e => onContextmenu(e)"
          v-if="multipage"
          :active-key="activePage"
          :hide-add="true"
          class="layout-tabs"
          type="editable-card"
          @change="changePage"
          @edit="editPage">
          <a-tab-pane :id="page.fullPath" :key="page.fullPath" v-for="page in pageList">
            <span slot="tab" :pagekey="page.fullPath">{{page.name}}</span>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- <VuePerfectScrollbar class="scroll-area" v-once :settings="setting"> -->
      <div :style="{height: '100vh',overflow:'auto', padding: '130px 24px 0'}" class="scroll">
        <transition name="page-toggle">
          <keep-alive v-if="multipage">
            <router-view />
          </keep-alive>
          <router-view v-else />
        </transition>
        <div style="padding: 0px">
          <global-footer :link-list="linkList" :copyright="copyright" />
        </div>
      </div>
      <!-- </VuePerfectScrollbar> -->
    </a-layout>
  </a-layout>
</template>

<script>

import Contextmenu from '../components/menu/Contextmenu'
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'
import Drawer from '../components/tool/Drawer'
import SiderMenu from '../components/menu/SiderMenu'
import Setting from '../components/setting/Setting'

let menuData = []

export default {
  name: 'MenuView',
  components: {Contextmenu, GlobalHeader, GlobalFooter, Drawer, SiderMenu, Setting},
  data () {
    return {
      pageList: [],
      activePage: '',
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
    }
  },
  computed: {
    multipage () {
      return this.$store.state.setting.multipage
    },
    isMobile () {
      return this.$store.state.setting.isMobile
    },
    theme () {
      return this.$store.state.setting.theme
    },
    layout () {
      return this.$store.state.setting.layout
    },
    linkList () {
      return this.$store.state.setting.footerLinks
    },
    copyright () {
      return this.$store.state.setting.copyright
    }
  },
  beforeCreate () {
    menuData = this.$router.options.routes.find((item) => item.path === '/').children
  },
  created () {
    this.pageList.push(this.$route)
    this.linkList.push(this.$route.fullPath)
    this.activePage = this.$route.fullPath
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      let list = []
      this.activePage = newRoute.fullPath
      if (!this.multipage) {
        this.linkList = [newRoute.fullPath]
        list.push(newRoute)
      } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
        this.linkList.push(newRoute.fullPath)
        list = this.pageList.slice(0)
        list.push(newRoute)
      }
      if (list.length > 0) {
        this.$nextTick(() => {
          this.pageList = list
        })
      }
    },
    'activePage': function (key) {
      this.$router.push(key)
    },
    'multipage': function (newVal, oldVal) {
      if (!newVal) {
        this.linkList = [this.$route.fullPath]
        this.pageList = [this.$route]
      }
    }
  },
  methods: {
    changePage (key) {
      this.activePage = key
    },
    editPage (key, action) {
      this[action](key)
    },
    remove (key) {
      if (this.pageList.length === 1) {
        this.$message.warning('这是最后一页，不能再关闭了啦')
        return
      }
      this.pageList = this.pageList.filter(item => item.fullPath !== key)
      let index = this.linkList.indexOf(key)
      this.linkList = this.linkList.filter(item => item !== key)
      index = index >= this.linkList.length ? this.linkList.length - 1 : index
      this.activePage = this.linkList[index]
    },
    onContextmenu (e) {
      const pagekey = this.getPageKey(e.target)
      if (pagekey !== null) {
        e.preventDefault()
        this.menuVisible = true
      }
    },
    /**
     * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
     * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
     * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
     * @param target 查询开始目标
     * @param count 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
     * @returns {String}
     */
    getPageKey (target, depth) {
      depth = depth || 0
      if (depth > 2) {
        return null
      }
      let pageKey = target.getAttribute('pagekey')
      pageKey = pageKey || (target.previousElementSibling ? target.previousElementSibling.getAttribute('pagekey') : null)
      return pageKey || (target.firstElementChild ? this.getPageKey(target.firstElementChild, ++depth) : null)
    },
    onContentMenuSelect (key, target) {
      let pageKey = this.getPageKey(target)
      switch (key) {
        case '1':
          this.closeLeft(pageKey)
          break
        case '2':
          this.closeRight(pageKey)
          break
        case '3':
          this.closeOthers(pageKey)
          break
        default:
          break
      }
    },
    closeOthers (pageKey) {
      let index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(index, index + 1)
      this.pageList = this.pageList.slice(index, index + 1)
      this.activePage = this.linkList[0]
    },
    closeLeft (pageKey) {
      let index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(index)
      this.pageList = this.pageList.slice(index)
      if (this.linkList.indexOf(this.activePage) < 0) {
        this.activePage = this.linkList[0]
      }
    },
    closeRight (pageKey) {
      let index = this.linkList.indexOf(pageKey)
      this.linkList = this.linkList.slice(0, index + 1)
      this.pageList = this.pageList.slice(0, index + 1)
      if (this.linkList.indexOf(this.activePage < 0)) {
        this.activePage = this.linkList[this.linkList.length - 1]
      }
    },
    toggleCollapse () {
      this.collapsed = !this.collapsed
    },
    onDrawerChange (show) {
      this.collapsed = show
    },
    onMenuSelect () {
      this.toggleCollapse()
    },
    onSettingDrawerChange (val) {
      this.showSetting = val
    }
  }
}
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
    width: ~'calc(100% - 256px)';
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
</style>
