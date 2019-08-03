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
  }
};
