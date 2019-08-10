import Mock from 'mockjs';
import '@/mock/extend';

const StudentList = Mock.mock({
  'list|5': [
    {
      'dbid': '00000',
      'id|+1': 11452681,
      'name': '王斌',
      'sex': '男',
      'age': 20,
      'birthday': '2019-09-08',
      'tel': '1727 277 2772',
      'parent':'1626162929（李龙飞）',
      'address':'成都市金牛区茶店子正街99号',
      'status':'学习中',
      'createTime':'2019-09-08 09:00:00',
    }
  ]
}).list;

// 查询列表
Mock.mock(RegExp('mock/student/search.*'), 'get', (options) => {
  console.log(options);
  return {
    data: {
      content: StudentList,
      total: 30,
      pageSize: 10,
      pageNum: 1
    },
    errorMessage: '',
    statusCode: 200
  };
});

// 删除
Mock.mock(RegExp('mock/student/delete.*'), 'delete', (options) => {
  let urls = options.url.split('/');
  let id = urls[ urls.length - 1 ];
   console.log('delete', options);
   
  let n = StudentList.length;
  while (n--) {
    if (StudentList[n].id == id) {
        StudentList.splice(n, 1);
      break;
    }
  }
  return {
    errorMessage: '',
    statusCode: 200
  };
});

// 添加
let guid = 100000;
Mock.mock('mock/student/create', 'post', (options) => {
  let body = JSON.parse(options.body);
  body.id = guid++;

  StudentList.push(body);
  return {
    data: body,
    errorMessage: '',
    statusCode: 200
  };
});

// 修改
Mock.mock('mock/student/update', 'put', (options) => {
  let body = JSON.parse(options.body);

  let n = StudentList.length;
  while (n--) {
    if (StudentList[n].id == body.id) {
        StudentList[n] = body;
      break;
    }
  }

  return {
    data: body,
    errorMessage: '',
    statusCode: 200
  };
});
