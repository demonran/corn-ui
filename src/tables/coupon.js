// import Const from './const';

export default {
  path: '/coupon',
  name: 'Coupon Management',
  dbname: 'coupon',
  dbidField: 'id',

  cols: [
    {
      name: 'title',
      ui: 'textui',
      required: true,
      listTable: {
        slot: 'coupontitle'
        // cell: {
        //   name: 'clickCell',
        //   click (text, record, index) {
        //     console.log(record.id);
        //   }
        // }
      }
    },
    {
      name: 'code',
      ui: 'textui',
      required: true,
      listTable: true,
      addable: true
    },
    {
      name: 'expirationDate',
      ui: 'textui',
      required: true,
      listTable: {
        cell: {
          name: 'timeCell',
          expiredCheck: true
        }
      }
      // addable: true
    },
    {
      name: 'cashBackInfo',
      ui: 'textui',
      listTable: true
    },
    {
      name: 'upVoteCounts',
      ui: 'textui',
      listTable: true,
      required: true
    },
    {
      name: 'browseCounts',
      ui: 'textui',
      listTable: true
    },
    {
      name: 'shareCounts',
      ui: 'textui',
      listTable: true
    },
    {
      name: 'score',
      ui: 'textui',
      listTable: true,
      addable: true
    }, {
      name: 'userName',
      ui: 'textui',
      listTable: true
    }
  ],
  services: {
    list: '/mock/coupon/search',
    add: '/wmsApi/wmsUser/addUser',
    update: '/wmsApi/wmsUser/updateUserInfo',
    delete: '/wmsApi/wmsUser/removeUser'
  },
  route: {
    list: {
      name: 'Coupon List',
      path: '/coupon/list',
      config: {
        // addBtn: true,
        updateBtn: true,
        // tableActionDel: true,
        // tableActionDetail: true,
        title: 'Coupon List'
      }
    }
  }
};
