import Const from './const';

export default {
  parent: '设置',
  dbname: 'category',
  dbidField: 'categoryId',
  debug: true,

  cols: [
    {
      name: {name: '分类名称'},
      required: true,
      listTable: {},
      ui:"textui",
      addable: {
          
      }
    },
  ],
  services: {
    list: '/category/search',
    add: '/category/create',
    update: '/category/update',
    delete: '/category/delete'
  },
  routes:[
    {
      name: '课程分类',
      path: '/setting/categories',
      component:'list',
      parent:'设置',
      config: {
        tableActionDel: true,
        tableActionDetail: true,
        actions:{
          list:['添加']
        },
      }
    },
    {
      name: '添加课程分类',
      path: '/setting/addcategory',
      component:'add',
      parent:'设置',
      invisible:true,
      config: {
        title: '添加课程分类'
      }
    },
    {
      name: '更新课程分类',
      component:'update',
      parent:'设置',
      invisible:true,
      path: '/setting/updatecategory',
      config: {
        title: '更新课程分类'
      }
    }
  ]
};
