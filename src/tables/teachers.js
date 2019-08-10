import Const from './const';
import RouteView from '@/layouts/RouteView';

export default {
  dbname: 'teacher',
  dbidField: 'teacherId',
  debug: true,

  cols: [
    {
      name: {avatar: '教师头像'},
      listTable: {
        cell: {
          name: 'imageCell',
          avatar: true
        }
      },
      addable: {
        required: true,
        ui:"imageui"
      }
    },
    {
      name: {name: '教师名称'},
      required: true,
      listTable: true,
      addable: {
        required: true,
        ui:"textui"
      }
    },
    {
      name: {teachCategory: '教学课程'},
      listTable: true,
      addable: {
        required: true,
        ui:{
          selectui:{
            dataS:{
              remote:{
                url:"/category/search?pageNum=1&pageSize=10",
                filter(row){
                 return {value:row.categoryId,label:row.name};
                },
                debug:true,
              }
            }
          }
        }
      }
    },
    {
      name: {tel: '联系电话'},
      listTable: true,
      addable: {
        required: true,
        ui:'textui'
      },
    },
    {
      name: {address: '家庭住址'},
      listTable: true,
      addable: {
        required: true,
        ui:'textui'
      },
    },
      {
        name: {school: '毕业院校'},
        listTable: true,
        addable: {
          ui:'textui'
        },
       
      },
      {
        name: {status: '状态'},
        listTable: true,
        addable: {
          // required: true,
          ui:{
            selectui:{
            dataS:{
              array:[{label:'在职',value:'在职'},{label:'离职',value:'离职'}]
            }
          }
        }
        },
      },
    {
      name: {desc: '详细介绍'},
      // listTable: true,
      addable: {
        // required: true,
        ui:'richtextui'
      },
    },
    
  ],
  services: {
    list: '/teacher/search',
    add: '/teacher/create',
    update: '/teacher/update',
    delete: '/teacher/delete'
  },
  routes: [
    {
      path: '/setting',
      parent:'Home',
      name: '设置',
      component:RouteView,
      children:[],
    },
    {
      name: '教师管理',
      path: '/setting/teachers',
      component:'list',
      parent:'设置',
      config: {
        tableActionDel: true,
        tableActionDetail: true,
        actions:{
          list:['添加']
        },
        search: {
          list:[
            // {
            //   name:{name:'名称'},
            //   ui:{
            //     name:'selectui',
            //     dataS:{
            //       array:[{value:-1,label:'robot adding'},{value:0,label:'user adding'},{value:1,label:'online'}]
            //     }
            //   }
            // },
            {
              name:{name:'名称'},
              ui:'textui'
            },
            {
              name:{keywords:'关键词'},
              ui:'textui'
            },
          ]
        }
      }
    },
    {
      name: '添加老师',
      path: '/setting/addteacher',
      component:'add',
      parent:'设置',
      invisible:true,
      config: {
        title: '添加老师'
      }
    },
    {
      name: '更新老师信息',
      path: '/setting/updateteacher',
      parent:'设置',
      invisible:true,
      component:'update',
      config: {
        title: '更新老师信息'
      }
    }
  ]
};
