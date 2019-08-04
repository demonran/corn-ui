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
      config: {
        addBtn: true,
        updateBtn: true,
        tableActionDel: true,
        tableActionDetail: true,
        title: '课程分类管理',
      }
    },
    {
      name: '添加课程分类',
      path: '/setting/addcategory',
      component:'add',
      invisible:true,
      config: {
        title: '添加课程分类'
      }
    },
    {
      name: '更新课程分类',
      component:'update',
      path: '/setting/updatecategory',
      config: {
        title: '更新课程分类'
      }
    }
  ]
};
