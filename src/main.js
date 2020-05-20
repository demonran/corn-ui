// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/lazy';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import './components/confirm';
import './components/ui';
import './components/tableCell';

import Viser from 'viser-vue';
import axios from 'axios';
import store from './store';
import PouchDB from 'pouchdb';
import services from './services/index';

import './assets/style/index.less'

Vue.prototype.$srv = services;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(Viser);
Vue.use(Antd);
// Vue.prototype.$form = Form

window.Bus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    var db = new PouchDB('admindb');
    db.get('currUser').then(doc => {
      this.$store.commit('account/setuser', doc.user);
    });
  }
});
