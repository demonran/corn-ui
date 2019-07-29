import Mock from 'mockjs';
import '@/mock/extend';

const TeacherList = Mock.mock({
  'list|5': [
    {
      'dbid': '00000',
      'teacherId|+1': 11452681,
      'name': '王斌',
      'avatar': require('../../assets/defaultAvator.jpeg'),
      'teachCategory': '音乐',
      'school': '四川大学美术学院',
      'tel': '1727 277 2772',
      'address': '成都市春熙路111号',
      'status': '离职', // 离职，在职
      'joinTime': '2019-07-06',
      'experience': '3年', // 1年，2年，3年,4年
      'desc': '<p>这是老师简介</p>'
    }
  ]
}).list;

// 查询列表
Mock.mock(RegExp('mock/teacher/search.*'), 'get', (options) => {
  console.log(options);
  return {
    data: {
      content: TeacherList,
      total: 30,
      pageSize: 10,
      pageNum: 1
    },
    errorMessage: '',
    statusCode: 200
  };
});

// 删除
Mock.mock(RegExp('mock/teacher/delete.*'), 'delete', (options) => {
  let urls = options.url.split('/');
  let id = urls[ urls.length - 1 ];

  let n = TeacherList.length;
  while (n--) {
    if (TeacherList[n].teacherId == id) {
      TeacherList.splice(n, 1);
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
Mock.mock('mock/teacher/create', 'post', (options) => {
  let body = JSON.parse(options.body);
  body.teacherId = guid++;

  TeacherList.push(body);
  return {
    data: body,
    errorMessage: '',
    statusCode: 200
  };
});
