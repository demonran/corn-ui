import Const from './const';
import RouteView from '@/layouts/RouteView';

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
          ui:{
            radioui:{
              initVal:'男',
              dataS:[{value:'男',label:'男'},{value:'女',label:'女'}]
            }
          },
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
          ui:'dateui'
        }
      },
      {
        name: {school: '就读学校'},
        addable: {
          ui:'textui'
        }
      },
      {
        name: {grade: '年级'},
        addable: {
          ui:{
            selectui:{
            dataS:{
              array:[
                {label:'幼儿园',value:'幼儿园'},
                {label:'小学',value:'小学'},
                {label:'初中',value:'初中'},
                {label:'高中',value:'高中'},
                {label:'大学',value:'大学'}]
            }
            }
            }
        }
      },
      {
        name: {tel: '联系电话'},
        addable: {
          ui:'textui'
        }
      },

      {
        name: {parentName: '家长姓名'},
        addable: {  
          required:true, 
          ui:"textui",
        }
      },
      {
        name: {parent:'联系电话'},
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
          ui:'textui'
        }
      },{
        name: {parentEmail:'家长邮箱'},
        listTable:true,
        addable: {
          ui:'textui'
        }
      },{
        name: {parentWechat:'家长微信'},
        listTable:true,
        addable: {
          ui:'textui'
        }
      },
      {
        name:{createTime:'创建时间'},
        listTable:true,
      },
      {
        name:{id:'操作'},
        listTable:{
          cell:{
            name:'actionCell',
            btns: [
              {
                label: '详情',
                click (text, record) {
                  window.Bus.$emit('pageChange','update', {row:record});
                } 
              },
               Const.actionsEditBtn(),
               Const.actionsDelBtn('id')
            ]
          }
        }
      }
  ],
  services: {
    list: '/student/search',
    add: '/student/create',
    update: '/student/update',
    delete: '/student/delete'
  },
  routes: [
    // {
    //   name: '学员管理',
    //   path: '/students',
    //   component:RouteView,
    //   parent:'Home',
    //   post:'设置',
    //   children:[],
    //   config: {
    //     // addBtn: true,
    //     tableActionDel: true,
    //     tableActionDetail: true,
    //   }
    // },
    {
      name: '学员列表',
      path: '/students/list',
      component:'list',
      parent:'教务',
      config: {
        // addBtn: true,
        tableActionDel: true,
        tableActionDetail: true,
        actions:{
          list:['添加',
          ]
        },
      }
    },
    {
      name: '添加学员',
      path: '/students/add',
      parent:'教务',
      invisible:true,
      component:'add',
      config: {
        formOrder:{
           groups:[
              {name:'报名信息',before:'name'},
              {name:'家长信息',before:'parentName'}
           ]
        }
      }
    },
    {
      name: '更新学员',
      parent:'教务',
      invisible:true,
      component:'update',
      path: '/students/update',
      config: {
        title: '更新学员'
      }
    }
  ]
};
