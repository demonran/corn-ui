import Vue from "vue";
import Router from "vue-router";
import RouteView from "@/layouts/RouteView";
import MenuView from "@/layouts/MenuView2";
import Login from "@/pages/login/Login";

Vue.use(Router);
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    invisible: true
  },
  {
    path: "/",
    name: "Home",
    component: MenuView,
    redirect: "/login",
    icon: "none",
    invisible: true,
    children: [
      {
        path: "/situation",
        name: "概况",
        component: () => import("@/pages/situation/situation"),
        icon: "solution"
      },
      {
        path: "/lesson",
        name: "上课",
        component: () => import("@/pages/coursestudy/lesson"),
        icon: "solution",
      },
      {
        path: "/lesson/:id",
        name: '上课详情',
        component : ()=> import('@/pages/coursestudy/lesson-detail'),
        icon: 'none',
        invisible: true
      },
      /* {
        path: '/dashboard',
        name: 'DashBoard',
        component: RouteView,
        icon: 'dashboard',
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/pages/dashboard/WorkPlace'),
            icon: 'none'
          },
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: () => import('@/pages/dashboard/Analysis'),
            icon: 'none'
          }
        ]
      }, */
      {
        path: "/course",
        name: "课程",
        component: RouteView,
        icon: "table",
        children: [
          {
            path: "/course/offline",
            name: "线下课程",
            component: () => import("@/pages/offlineCourse/list"),
            icon: "none"
          },
          {
            path: "/course/addOffline",
            name: "添加线下课程",
            invisible: true,
            component: () => import("@/pages/offlineCourse/add"),
            icon: "none"
          },
          {
            path: "/course/updateOffline",
            name: "编辑线下课程",
            invisible: true,
            component: () => import("@/pages/offlineCourse/update"),
            icon: "none"
          },
          {
            path: "/course/videocourse",
            name: "视频公开课",
            component: () => import("@/pages/videocourse/list"),
            icon: "none"
          },
          {
            path: "/course/addVideo",
            name: "添加视频公开课",
            invisible: true,
            component: () => import("@/pages/videocourse/add"),
            icon: "none"
          },
          {
            path: "/course/edtVideo",
            name: "编辑视频公开课",
            invisible: true,
            component: () => import("@/pages/videocourse/add"),
            icon: "none"
          }
        ]
      },
      // 作品模块
      {
        path: "/painting",
        name: "作品",
        component: () => import("@/pages/painting/list"),
        icon: "book"
      },

      // 动态模块
      {
        path: "/dynamic",
        name: "动态",
        component: RouteView,
        icon: "book",
        children: [
          {
            path: "/dynamic/banner",
            name: "首页幻灯",
            component: () => import("@/pages/dynamic/banner/list"),
            icon: "none"
          },
          {
            path: "/dynamic/article",
            name: "文章管理",
            component: () => import("@/pages/dynamic/article/list"),
            icon: "none"
          }
        ]
      },



      // 报名模块
      {
        path: "/signUp",
        name: "报名",
        component: () => import("@/pages/signUp/signUp"),
        icon: "form"
      },
      // 报名隐藏的
      {
        path: "/signUp",
        name: "报名隐藏的",
        component: RouteView,
        invisible: true,
        icon: "form",
        children: [
          {
            path: "/signUp/addSignUp",
            name: "添加报名",
            invisible: true,
            component: () => import("@/pages/signUp/addSignUp"),
            icon: "none"
          }
        ]
      },
      // 学员
      {
        path: "/students",
        name: "学员",
        component: () => import("@/pages/students/stulist"),
        icon: "solution"
      },
      // 微信用户管理
      {
        path: "/user/list",
        name: "微信用户管理",
        component: () => import("@/pages/user/index"),
        icon: "solution"
      },

      // test
      {
        path: "/students",
        name: "学员隐藏的",
        component: RouteView,
        icon: "solution",
        invisible: true,
        children: [
          {
            path: "/students/stulist",
            name: "学员详情",
            component: () => import("@/pages/students/stulist"),
            icon: "none"
          }
        ]
      },
      // 设置
      {
        path: "/settings",
        name: "设置",
        component: RouteView,
        icon: "setting",
        children: [
          {
            path: "/settings/category",
            name: "课程分类",
            component: () => import("@/pages/category/list"),
            icon: "none"
          },
          {
            path: "/settings/category/add",
            name: "添加课程分类",
            invisible: true,
            component: () => import("@/pages/category/add"),
            icon: "none"
          },
          {
            path: "/settings/category/edt",
            name: "编辑课程分类",
            invisible: true,
            component: () => import("@/pages/category/add"),
            icon: "none"
          },
          {
            path: "/settings/category/result",
            name: "结果",
            invisible: true,
            component: () => import("@/pages/result/Success"),
            icon: "none"
          },
          {
            path: "/settings/information",
            name: "机构信息",
            component: () => import("@/pages/settings/information/infor"),
            icon: "none"
          },
          {
            path: "/settings/teacher",
            name: "教师管理",
            icon: "none",
            component: () => import("@/pages/settings/teacher/list")
          },
          {
            path: "/settings/addTeacher",
            name: "添加教师",
            icon: "none",
            invisible: true,
            component: () => import("@/pages/settings/teacher/add")
          },
          {
            path: "/settings/edtTeacher",
            name: "编辑教师",
            icon: "none",
            invisible: true,
            component: () => import("@/pages/settings/teacher/add")
          },

        ]
      },

      {
        path: "/marketing",
        name: "营销管理",
        component: () => import("@/pages/settings/marketing"),
        icon: "none",
        children: [{
          path: "/marketing/newer-coupon",
          name: "拉新设置",
          component: () => import("@/pages/settings/marketing/newer-coupon"),
          icon: "none"
        },
          {
            path: "/marketing/withdraw",
            name: "提现申请",
            component: () => import("@/pages/settings/marketing/withdraw"),
            icon: "none"
          }]
      },

      // 小程序设置
      {
        path: "/wxconfig",
        name: "微信设置",
        component: RouteView,
        icon: "wechat",
        children: [
          {
            path: "/wxconfig/payment",
            name: "支付设置",
            component: () => import('@/pages/wxconfig/payment'),
            icon: "none"
          },
          {
            path: "/wxconfig/wxmp",
            name: "公众号设置",
            component: () => import('@/pages/wxconfig/wxmp'),
            icon: "none"
          }
        ]
      },



      {
        path: "/exception",
        name: "异常页",
        icon: "warning",
        component: RouteView,
        invisible: true,
        children: [
          {
            path: "/exception/404",
            name: "404",
            icon: "none",
            component: () => import("@/pages/exception/404")
          },
          {
            path: "/exception/403",
            name: "403",
            icon: "none",
            component: () => import("@/pages/exception/403")
          },
          {
            path: "/exception/500",
            name: "500",
            icon: "none",
            component: () => import("@/pages/exception/500")
          }
        ]
      },

    ]
  }
];

export default new Router({routes});
