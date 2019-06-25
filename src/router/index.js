
import Vue from "vue";
import Router from 'vue-router';
import Main from '@/screens/main';
import Login from "@/screens/login";
import Nosupport from "@/screens/nosupport";
import OfflineCourse from "@/screens/offlinecourse";

Vue.use(Router);

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
        },{
          path:'/nosupport',
          component:Nosupport
        },{
          path:'/offlinecourse',
          component:OfflineCourse
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
