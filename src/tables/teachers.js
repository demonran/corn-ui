import Const from './const';

export default {
  path: '/setting',
  name: '设置',
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
      name: {desc: '详细介绍'},
      // listTable: true,
      addable: {
        // required: true,
        ui:'richtextui'
      },
    }
  ],
  services: {
    list: '/teacher/search',
    add: '/teacher/create',
    update: '/teacher/update',
    delete: '/teacher/delete'
  },
  route: {
    list: {
      name: '教师管理',
      path: '/setting/teachers',
      config: {
        addBtn: true,
        updateBtn: true,
        tableActionDel: true,
        tableActionDetail: true,
        title: '教师名单',
        tableCols: [0, 1, 2]
      }
    },
    add: {
      name: '添加老师',
      path: '/setting/addteacher',
      invisible:true,
      config: {
        title: '添加老师'
      }
    },
    update: {
      name: '更新老师信息',
      path: '/setting/updateteacher',
      config: {
        title: '更新老师信息'
      }
    }
  }
};
