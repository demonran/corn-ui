import Const from './const';

export default {
    dbname: 'student',
    dbidField: 'id',
    debug: true,
    
    cols: [
    {
      name: {name: '学生姓名'},
      listTable: {},
      addable: {  
        required:true, 
        ui:"textui",
      }
    },
    {
        name: {sex: '性别'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        },
        addable: {  
          required:true, 
          ui:"textui",
        }
    },
    {
        name: {age: '年龄'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        },
        
      },
      {
        name: {birthday: '出生日期'},
        addable: {
          required: true,
          ui:'textui'
        }
      },

      {
        name: {parent:'家长电话'},
        listTable:true,
        addable: {
          required: true,
          ui:'textui'
        }
      },
      {
        name:{address:'居住地址'},
        listTable:true,
        addable: {
          required: true,
          ui:'textui'
        }
      },
      {
        name:{createTime:'创建时间'},
        listTable:true,
      }
  ],
  services: {
    list: '/student/search',
    add: '/student/create',
    update: '/student/update',
    delete: '/student/delete'
  },
  routes: [
    {
      name: '学员',
      path: '/students/list',
      component:'list',
      parent:'Home',
      post:'设置',
      config: {
        addBtn: true,
        tableActionDel: true,
        tableActionDetail: true,
      }
    },
    {
      name: '添加学员',
      path: '/students/add',
      invisible:true,
      parent:'Home',
      config: {
        title: '添加学员'
      }
    },
    {
      parent:'Home',
      name: '更新学员',
      invisible:true,
      component:'update',
      path: '/students/update',
      config: {
        title: '更新学员'
      }
    }
  ]
};
