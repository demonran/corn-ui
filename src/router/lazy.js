import Vue from 'vue';
import Router from 'vue-router';
import PageView from '@/layouts/PageView';
import RouteView from '@/layouts/RouteView';
import MenuView from '@/layouts/MenuView2';
import Login from '@/pages/login/Login';
import Tables from '@/tables/index';

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    invisible: true
  },
  {
    path: '/',
    name: 'Home',
    component: MenuView,
    redirect: '/login',
    icon: 'none',
    invisible: true,
    children: [
      {
        path: '/situation',
        name: '概况',
        component: () => import('@/pages/situation/situation'),
        icon: 'solution'
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
        path: '/course',
        name: '课程',
        component: RouteView,
        icon: 'table',
        children: [
          {
            path: '/course/offline',
            name: '线下课程',
            component: () => import('@/pages/offlineCourse/list'),
            icon: 'none'
          },
          {
            path: '/course/addOffline',
            name: '添加线下课程',
            invisible: true,
            component: () => import('@/pages/offlineCourse/add'),
            icon: 'none'
          },
          {
            path: '/course/updateOffline',
            name: '编辑线下课程',
            invisible: true,
            component: () => import('@/pages/offlineCourse/update'),
            icon: 'none'
          }
        ]
      },

      // 报名模块
      {
        path: '/signUp',
        name: '报名',
        component: () => import('@/pages/signUp/signUp'),
        icon: 'form'
      },
      // 报名隐藏的
      {
        path: '/signUp',
        name: '报名隐藏的',
        component: RouteView,
        invisible: true,
        icon: 'form',
        children: [
          {
            path: '/signUp/addSignUp',
            name: '添加报名',
            invisible: true,
            component: () => import('@/pages/signUp/addSignUp'),
            icon: 'none'
          }
        ]
      },
      // 学员
      {
        path: '/students',
        name: '学员',
        component: () => import('@/pages/students/stulist'),
        icon: 'solution'
      },
      // 微信用户管理
      {
        path: '/user/list',
        name: '微信用户管理',
        component: () => import('@/pages/user/index'),
        icon: 'solution'
      },

      // test
      {
        path: '/students',
        name: '学员隐藏的',
        component: RouteView,
        icon: 'solution',
        invisible: true,
        children: [
          {
            path: '/students/stulist',
            name: '学员详情',
            component: () => import('@/pages/students/stulist'),
            icon: 'none'
          }
        ]
      },
      // 设置
      {
        path: '/settings',
        name: '设置',
        component: RouteView,
        icon: 'setting',
        children: [
          {
            path: '/settings/category',
            name: '课程分类',
            component: () => import('@/pages/category/list'),
            icon: 'none'
          },
          {
            path: '/settings/category/add',
            name: '添加课程分类',
            invisible: true,
            component: () => import('@/pages/category/add'),
            icon: 'none'
          },
          {
            path: '/settings/category/result',
            name: '结果',
            invisible: true,
            component: () => import('@/pages/result/Success'),
            icon: 'none'
          },
          {
            path: '/settings/banner',
            name: 'Banner设置',
            component: () => import('@/pages/settings/banner/list'),
            icon: 'none'
          }, {
            path: '/settings/addbanner',
            name: '新增banner',
            invisible: true,
            component: () => import('@/pages/settings/banner/add')
          }
        ]
      },
      {
        path: '/form',
        name: '表单页',
        component: PageView,
        icon: 'form',
        invisible: true,
        children: [
          {
            path: '/form/basic',
            name: '基础表单',
            component: () => import('@/pages/form/BasicForm'),
            icon: 'none'
          },
          {
            path: '/form/step',
            name: '分步表单',
            component: () => import('@/pages/form/stepForm/StepForm'),
            icon: 'none'
          },
          {
            path: '/form/advanced',
            name: '高级表单',
            component: () => import('@/pages/form/advancedForm/AdvancedForm'),
            icon: 'none'
          }
        ]
      },
      {
        path: '/list',
        name: '列表页',
        component: PageView,
        icon: 'table',
        invisible: true,
        children: [
          {
            path: '/list/query',
            name: '查询表格',
            component: () => import('@/pages/list/QueryList'),
            icon: 'none'
          },
          {
            path: '/list/primary',
            name: '标准列表',
            component: () => import('@/pages/list/StandardList'),
            icon: 'none'
          },
          {
            path: '/list/card',
            name: '卡片列表',
            component: () => import('@/pages/list/CardList'),
            icon: 'none'
          },
          {
            path: '/list/search',
            name: '搜索列表',
            component: () => import('@/pages/list/search/SearchLayout'),
            icon: 'none',
            children: [
              {
                path: '/list/search/article',
                name: '文章',
                component: () => import('@/pages/list/search/ArticleList'),
                icon: 'none'
              },
              {
                path: '/list/search/application',
                name: '应用',
                component: () => import('@/pages/list/search/ApplicationList'),
                icon: 'none'
              },
              {
                path: '/list/search/project',
                name: '项目',
                component: () => import('@/pages/list/search/ProjectList'),
                icon: 'none'
              }
            ]
          }
        ]
      },
      {
        path: '/detail',
        name: '详情页',
        icon: 'profile',
        component: RouteView,
        invisible: true,
        children: [
          {
            path: '/detail/basic',
            name: '基础详情页',
            icon: 'none',
            component: () => import('@/pages/detail/BasicDetail')
          },
          {
            path: '/detail/advanced',
            name: '高级详情页',
            icon: 'none',
            component: () => import('@/pages/detail/AdvancedDetail')
          }
        ]
      },
      {
        path: '/result',
        name: '结果页',
        icon: 'check-circle-o',
        component: PageView,
        invisible: true,
        children: [
          {
            path: '/result/success',
            name: '成功',
            icon: 'none',
            component: () => import('@/pages/result/Success')
          },
          {
            path: '/result/error',
            name: '失败',
            icon: 'none',
            component: () => import('@/pages/result/Error')
          }
        ]
      },
      {
        path: '/exception',
        name: '异常页',
        icon: 'warning',
        component: RouteView,
        invisible: true,
        children: [
          {
            path: '/exception/404',
            name: '404',
            icon: 'none',
            component: () => import('@/pages/exception/404')
          },
          {
            path: '/exception/403',
            name: '403',
            icon: 'none',
            component: () => import('@/pages/exception/403')
          },
          {
            path: '/exception/500',
            name: '500',
            icon: 'none',
            component: () => import('@/pages/exception/500')
          }
        ]
      },
      {
        path: '/components',
        redirect: '/components/taskcard',
        name: '小组件',
        icon: 'appstore-o',
        invisible: true,
        component: PageView,
        children: [
          {
            path: '/components/taskcard',
            name: '任务卡片',
            icon: 'none',
            component: () => import('@/pages/components/TaskCard')
          },
          {
            path: '/components/palette',
            name: '颜色复选框',
            icon: 'none',
            component: () => import('@/pages/components/Palette')
          }
        ]
      }
    ]
  }
];

// let n = Tables.routes.length;
// for (let i = 0; i < n; i++) {
//   let pos = Tables.routes[i].pos;
//   let currRoute = Tables.routes[i].route;
//
//   if (!pos.parent) { //没有父级放在根路
//     let inserted = false;
//     if (pos.pre) {
//       let len = routes.length;
//       for (let k = 0; k < len; k++) {
//         if (routes[k].name == pos.pre) {
//           routes.splice(k + 1, 0, currRoute);
//           inserted = true;
//           break;
//         }
//       }
//     }
//     if (pos.post && !inserted) {
//       let len = routes.length;
//       for (let k = 0; k < len; k++) {
//         if (routes[k].name == pos.post) {
//           routes.splice(k, 0, currRoute);
//           inserted = true;
//           break;
//         }
//       }
//     }
//     if (!inserted) {
//       routes.push(currRoute);
//     }
//     continue;
//   }
//
//   //有parent
//   function findNode(nodes, name) {
//     let n = nodes.length;
//     for (let i = 0; i < n; i++) {
//       let item = nodes[i];
//       if (item.name == name) {
//         return item;
//       }
//       if (item.children) {
//         let ret = findNode(item.children, name);
//         if (ret) return ret;
//       }
//     }
//   }
//
//   let parentNode = findNode(routes, pos.parent);
//   if (!parentNode) {
//     console.error('not find ' + pos.parent, pos);
//     continue;
//   }
//   let root = parentNode.children;
//   let len = root.length;
//   let inserted = false;
//
//   for (let k = 0; k < len; k++) {
//     let item = root[k];
//
//     if (pos.pre && item.name == pos.pre) {
//       root.splice(k + 1, 0, currRoute);
//       inserted = true;
//       break;
//     }
//
//     if (pos.post && item.name == pos.post) {
//       root.splice(k, 0, currRoute);
//       inserted = true;
//       break;
//     }
//   }
//   if (!inserted) {
//     root.push(currRoute);
//   }
// }
export default new Router({ routes });
