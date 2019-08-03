import Const from './const';

export default {
    path: '/class',
    name: '班级管理',
    dbname: 'classmgr',
    dbidField: 'id',
    debug: true,
    

  cols: [
    {
      name: {name: '班级名称'},
      listTable: {},
      addable: {   
        required: true,
        ui:"textui",
      }
    },
    {
        name: {count: '学生人数'},
        listTable: true,
    },
    {
        name: {teacher: '老师名称'},
        listTable: true,
        addable: {
          required: true,
          ui:Const.TeacherListSelect
        }
      },
      {
        name: {teacherTel: '老师电话'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        }
      },

      {
        name: {startDate:'开课时间'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        },
        addable:{
          required:true,
          ui:'dateui'
        },
      },
      {
        name: {endDate:'结束时间'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        },
        addable:{
          ui:'dateui'
        }
      },
      {
        name: {classTime:'上课时间'},
        listTable: {
        //   cell: {
        //     name: 'imageCell',
        //     avatar: true
        //   }
        },
        addable:{
          ui:'textui'
        }
      }
  ],
  services: {
    list: '/class/search',
    add: '/class/create',
    update: '/class/update',
    delete: '/class/delete'
  },
  route: {
    list: {
      name: '班级管理',
      path: '/class/list',
      config: {
        addBtn: true,
        tableActionDel: true,
        tableActionDetail: true,
        title: '班级管理',
        search:{
          list:[
            {
              name:{name:'班级名称'},
              ui:'textui'
            }
          ]
        }
      }
    },

    add: {
      name: '添加班级',
      path: '/class/add',
      invisible:true,
      config: {
        title: '添加班级'
      }
    },
    update: {
      name: '更新班级信息',
      path: '/class/update',
      config: {
        title: '更新班级信息'
      }
    }
  }
};
