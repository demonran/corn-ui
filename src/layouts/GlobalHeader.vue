<template>
  <a-layout-header :class="[theme, 'global-header']">
    <div :class="['global-header-wide', layout]">
      <router-link v-if="isMobile || layout === 'head'" to="/" :class="['logo', isMobile ? null : 'pc', theme]">
        <img width="32" src="../assets/logo.svg" />
        <h1 v-if="!isMobile">{{systemName}}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon v-if="layout === 'side'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/>
      <div class="nav-container" ref="navContainer">
        <div ref="navtabs" :style="{width:navContainerWith+'px'}">
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
      </div>
      <div :class="['global-header-right', theme]">
          <!-- <header-search class="header-item" /> -->
<!--          <header-notice class="header-item"/>-->
          <header-avatar class="header-item"/>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderSearch from './HeaderSearch';
import HeaderNotice from './HeaderNotice';
import HeaderAvatar from './HeaderlAvatar';
import IMenu from '../components/menu/menu';
import Contextmenu from '../components/menu/Contextmenu';

export default {
  name: 'GlobalHeader',
  components: {IMenu, HeaderAvatar, HeaderNotice, HeaderSearch,Contextmenu},
  props: ['collapsed', 'menuData'],
  data(){
    return {
      linkList: [],
      pageList: [],
      activePage: '',
      menuItemList: [
        { key: '1', icon: 'arrow-left', text: '关闭左侧' },
        { key: '2', icon: 'arrow-right', text: '关闭右侧' },
        { key: '3', icon: 'close', text: '关闭其它' }
      ],
      menuVisible: false,
      navContainerWith:0,
    }
  },
  created () {
    this.pageList.push(this.$route);
    this.linkList.push(this.$route.fullPath);
    this.activePage = this.$route.fullPath;
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      let list = [];
      this.activePage = newRoute.fullPath;
      if (!this.multipage) {
        this.linkList = [newRoute.fullPath];
        list.push(newRoute);
      } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
        this.linkList.push(newRoute.fullPath);
        list = this.pageList.slice(0);
        list.push(newRoute);
      }
      if (list.length > 0) {
        this.$nextTick(() => {
          this.pageList = list;
        });
      }
    },
    'activePage': function (key) {
      this.$router.push(key);
    },
    'multipage': function (newVal, oldVal) {
      if (!newVal) {
        this.linkList = [this.$route.fullPath];
        this.pageList = [this.$route];
      }
    }
  },
  mounted(){
     let navContainer = this.$refs.navContainer;
     this.navContainerWith = navContainer.clientWidth;
     let scope = this;
     window.addEventListener('resize',()=>{
       scope.navContainerWith = scope.$refs.navContainer.clientWidth;
     },false)
  },
  computed: {
    multipage () {
      return this.$store.state.setting.multipage;
    },
    isMobile () {
      return this.$store.state.setting.isMobile;
    },
    layout () {
      return this.$store.state.setting.layout;
    },
    theme () {
      return this.layout === 'side' ? 'light' : this.$store.state.setting.theme;
    },
    systemName () {
      return this.$store.state.setting.systemName;
    }
  },
  methods: {
    toggleCollapse () {
      this.$emit('toggleCollapse');
    },
    onSelect (obj) {
      this.$emit('menuSelect', obj);
    },
    onContentMenuSelect (key, target) {
      let pageKey = this.getPageKey(target);
      switch (key) {
        case '1':
          this.closeLeft(pageKey);
          break;
        case '2':
          this.closeRight(pageKey);
          break;
        case '3':
          this.closeOthers(pageKey);
          break;
        default:
          break;
      }
    },
    closeOthers (pageKey) {
      let index = this.linkList.indexOf(pageKey);
      this.linkList = this.linkList.slice(index, index + 1);
      this.pageList = this.pageList.slice(index, index + 1);
      this.activePage = this.linkList[0];
    },
    closeLeft (pageKey) {
      let index = this.linkList.indexOf(pageKey);
      this.linkList = this.linkList.slice(index);
      this.pageList = this.pageList.slice(index);
      if (this.linkList.indexOf(this.activePage) < 0) {
        this.activePage = this.linkList[0];
      }
    },
    closeRight (pageKey) {
      let index = this.linkList.indexOf(pageKey);
      this.linkList = this.linkList.slice(0, index + 1);
      this.pageList = this.pageList.slice(0, index + 1);
      if (this.linkList.indexOf(this.activePage < 0)) {
        this.activePage = this.linkList[this.linkList.length - 1];
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
      depth = depth || 0;
      if (depth > 2) {
        return null;
      }
      let pageKey = target.getAttribute('pagekey');
      pageKey = pageKey || (target.previousElementSibling ? target.previousElementSibling.getAttribute('pagekey') : null);
      return pageKey || (target.firstElementChild ? this.getPageKey(target.firstElementChild, ++depth) : null);
    },
    changePage (key) {
      this.activePage = key;
    },
    editPage (key, action) {
      this[action](key);
    },
    remove (key) {
      if (this.pageList.length === 1) {
        this.$message.warning('这是最后一页，不能再关闭了啦');
        return;
      }
      this.pageList = this.pageList.filter(item => item.fullPath !== key);
      let index = this.linkList.indexOf(key);
      this.linkList = this.linkList.filter(item => item !== key);
      index = index >= this.linkList.length ? this.linkList.length - 1 : index;
      this.activePage = this.linkList[index];
    },
    onContextmenu (e) {
      const pagekey = this.getPageKey(e.target);
      if (pagekey !== null) {
        e.preventDefault();
        this.menuVisible = true;
      }
    },
  }
};
</script>

<style lang="less" scoped>
  .trigger {
    font-size: 20px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
    &:hover{
      color: #1890ff;
    }
  }
  .header-item{
    padding: 0 12px;
    display: inline-block;
    height: 100%;
    cursor: pointer;
    vertical-align: middle;
    i{
      font-size: 16px;
      color: rgba(0,0,0,.65);
    }
  }
  .global-header{
    padding: 0 12px 0 0;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    &.light{
      background: #fff;
    }
    &.dark{
      background: #001529;
    }
    .global-header-wide{
      display: flex;

      &.head{
        max-width: 1400px;
        margin: auto;
      }
      &.side{
      }
      .logo {
        height: 64px;
        line-height: 58px;
        vertical-align: top;
        display: inline-block;
        padding: 0 12px 0 24px;
        cursor: pointer;
        font-size: 20px;
        &.pc{
          padding: 0 12px 0 0;
        }
        img {
          display: inline-block;
          vertical-align: middle;
        }
        h1{
          display: inline-block;
          font-size: 16px;
        }
        &.dark h1{
          color: #fff;
        }
      }
      .global-header-menu{
        display: inline-block;
      }
      .global-header-right{
        float: right;
        flex-shrink: 0;
        &.dark{
          color: #fff;
          i{
            color: #fff;
          }
        }
      }
      .nav-container{
        flex: 1;
        padding-top: 24px;
        overflow: hidden;
      }
    }
  }
</style>
