
import Vue from "vue";
import Router from 'vue-router';
import Main from '@/screens/main';
import Login from "@/screens/login";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {
          path:'/color',
          component:Login
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ]
})
