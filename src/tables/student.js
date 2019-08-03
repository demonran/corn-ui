import Const from './const';

export default {
    path: '/students',
    name: '学生管理',
    dbname: 'students',
    dbidField: 'id',
    debug: true,
    

  cols: [
    {
      name: {name: '学生姓名'},
      required: true,
      listTable: {},
      ui:"textui",
      addable: {   
      }
    },
    {
        name: {count: '电话'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        },
    },
    {
        name: {teacher: '老师名称'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        },
        addable: {
          required: true,
          ui:{
            selectui:{
              dataS:{
                
              }
            }
          }
        }
      },
      {
        name: {teacher: '老师电话'},
        listTable: true
      },

      {
        name: {startDate:'开课时间'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        },
        addable:'dateui'
      },
      {
        name: {endDate:'结束时间'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        }
      },
      {
        name: {classTime:'上课时间'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        }
      }
  ],
  services: {
    list: '/category/search',
    add: '/category/create',
    update: '/category/update',
    delete: '/category/delete'
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
      name: '添加课程分类',
      path: '/setting/addcategory',
      invisible:true,
      config: {
        title: '添加课程分类'
      }
    },
    update: {
      name: '更新课程分类',
      path: '/setting/updatecategory',
      config: {
        title: '更新课程分类'
      }
    }
  }
};
