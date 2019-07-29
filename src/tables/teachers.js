import Const from './const';

export default {
  path: '/setting',
  name: '设置',
  dbname: 'teacher',
  dbidField: 'teacherId',
  debug: true,

  cols: [
    {
      name: {avatar: '图片'},
      required: true,
      listTable: {
        cell: {
          name: 'imageCell',
          avatar: true
        }
      },
      addable: true
    },
    {
      name: {name: '名称'},
      required: true,
      listTable: true,
      addable: true
    },
    {
      name: {teachCategory: '教学课程'},
      addable: true,
      listTable: true
    },

    {
      name: {school: '毕业院校'},
      listTable: true,
      addable: true,
      required: true
    },
    {
      name: {tel: '联系电话'},
      listTable: true,
      addable: true,
      required: true
    },
    {
      name: {address: '家庭住址'},
      listTable: true,
      addable: true,
      required: true
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
