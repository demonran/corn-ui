import Const from './const';

export default {
    path: '/students',
    name: '学生管理',
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
  route: {
    list: {
      name: '学员信息',
      path: '/students/list',
      config: {
        addBtn: true,
        updateBtn: true,
        tableActionDel: true,
        tableActionDetail: true,
        title: '学员信息',
      }
    },

    add: {
      name: '添加学员',
      path: '/students/add',
      invisible:true,
      config: {
        title: '添加学员'
      }
    },
    update: {
      name: '更新学员',
      path: '/students/update',
      config: {
        title: '更新学员'
      }
    }
  }
};
