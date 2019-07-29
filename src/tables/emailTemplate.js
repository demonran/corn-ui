import Const from './const';

export default {
  path: '/email',
  name: 'Email Setting',
  dbname: 'email',
  dbidField: 'type',

  cols: [
    {
      name: {type: 'Template Type'},
      ui: {
        selectui: {
          initVal: 0,
          dataS: {
            array: Const.EmailType
          }
        }
      },
      required: true,
      addable: true,
      listTable: {
        width: '150px'
      }
    },
    {
      name: 'subject',
      ui: 'textui',
      required: true,
      listTable: true,
      addable: true
    },
    {
      name: 'content',
      ui: 'richtextui',
      required: true,
      listTable: true,
      addable: true
    }
  ],
  services: {
    list: '/wmsApi/emailTemplate/search',
    add: '/wmsApi/emailTemplate/add',
    update: '/wmsApi/emailTemplate/update',
    delete: '/wmsApi/emailTemplate/remove'
  },
  route: {
    list: {
      name: 'Email Templates',
      path: '/email/list',
      config: {
        addBtn: true,
        updateBtn: true,
        tableActionDel: true,
        tableActionDetail: true,
        title: 'Email Template List'
      }
    },
    add: {
      name: 'Add Email Templates',
      path: '/email/add',
      config: {
        title: 'Add Email Template'
      }
    },
    update: {
      name: 'Update Email Templates',
      path: '/email/update',
      config: {
        title: 'Email Templates'
      }
    }
  }
};
