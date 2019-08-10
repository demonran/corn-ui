export default {
  EmailType: [
    {label: 'Register Confirm', value: 0},
    {label: 'Reset Password', value: 1}
  ],
  Roles: [
    {label: 'superAdmin', value: 'superAdmin'},
    {label: 'admin', value: 'admin'},
    {label: 'dealEditors', value: 'dealEditors'}
  ],

  TeacherListSelect:{
    selectui:{
      dataS:{
        remote:{
          url:"/teacher/search?pageNum=1&pageSize=20",
          filter(row){
           return {value:row.teacherId,label:row.name + '|' + row.tel};
          },
          debug:true,
        }
      }
    }
  },
  actionsDelBtn(idname)
  {
    return  {
      label: '删除',
      confirm: {
        name: 'tipConfirm',
        text: '确定删除?',
        del (text, record) {
          return record[idname];
        }
      }
    }
  },
  actionsEditBtn(){
    return  {
      label: '编辑',
      click (text, record) {

        console.log( record );
        window.Bus.$emit('pageChange','update', {row:record});
      }
    };
  }
};
