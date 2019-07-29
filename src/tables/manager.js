import Const from './const';

export default {
  path: '/system',
  name: 'System Setting',
  dbname: 'manager',
  dbidField: 'id',

  cols: [
    {
      name: 'userName',
      ui: 'textui',
      required: true,
      listTable: true,
      addable: true
    },
    {
      name: 'email',
      ui: 'textui',
      required: true,
      listTable: true,
      addable: true
    },
    {
      name: 'password',
      ui: 'passwordui',
      addable: true
    },

    {
      name: 'role',
      listTable: true,
      addable: true,

      ui: {
        selectui: {
          initVal: 'superAdmin',
          dataS: {
            array: Const.Roles
          }
        }
      },
      required: true
    },
    {
      name: 'lastLogin',
      listTable: {
        type: 'time'
      }

    }
  ],
  services: {
    list: '/wmsApi/wmsUser/list',
    add: '/wmsApi/wmsUser/addUser',
    update: '/wmsApi/wmsUser/updateUserInfo',
    delete: '/wmsApi/wmsUser/removeUser'
  },
  route: {
    list: {
      name: 'Manager List',
      path: '/system/managers',
      config: {
        addBtn: true,
        updateBtn: true,
        tableActionDel: true,
        tableActionDetail: true,
        title: 'Manager List',
        tableCols: [0, 1, 2]
      }
    },
    add: {
      name: 'Add Manager',
      path: '/email/addmanager',
      config: {
        title: 'Add Manager'
      }
    },
    update: {
      name: 'Update Manager',
      path: '/email/updatemanager',
      config: {
        title: 'Update Manager'
      }
    }
  }
};
