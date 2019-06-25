// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from 'fastclick'
import App from './App'
import router from './router/index';
import store from './store/index';
import ElementUI from 'element-ui';

import ZkTable from 'vue-table-with-tree-grid'
import "./libs/swiper.min.css";
// import 'cropperjs/dist/cropper.css';
import 'element-ui/lib/theme-chalk/index.css';
import Vtip from 'vtip'
import 'vtip/lib/index.min.css'
// 注册指令使用
Vue.use(Vtip.directive)
const Swiper = require('./libs/swiper.min.js').Swiper;
window.Swiper = Swiper;

Vue.use(ZkTable);
Vue.use(ElementUI);
FastClick.attach(document.body)

let Bus = new Vue();
window.Bus = Bus;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
