import Mock from 'mockjs';
import '@/mock/extend';

const CourseList = Mock.mock({
  'list|10': [
    {
      'dbid': '00000',
      'courseId|+1': 11452681,
      'status': '@COURSESTATE',
      'courseCode': 'xxkc001',
      'courseName': '少儿绘画入门班',
      'courseTitle': '少儿绘画入门班',
      'courseSubTitle': '少儿绘画入门班',
      'courseCategory': '少儿班',
      'price': 100,
      'lesson': 10,
      'totalAmount': 1500,
      'isShareBrokerage': true,
      'shareBrokerageAmount': 100,
      'limitStudents': 20,
      'teacher': '王老师',
      'imageUrl': 'http://xxx.png,http:xx2.png',
      'content': '<p>课程详情。。。</p>',
      'beginDate': '2019-07-05',
      'endDate': '2019-07-31',
      'startClassTime': '09:30',
      'endClassTime': '17:30'
    }
  ]
}).list;

// 查询列表
Mock.mock(RegExp('mock/offline/course/search.*'), 'get', (options) => {
  console.log(options);

  let ret = {
    data: {
        content: CourseList,
        total: 30,
        pageSize: 10,
        pageNum: 1
    },
    errorMessage: '',
    statusCode: 200
  };
  return ret;
});

// 删除课程
Mock.mock(RegExp('mock/offline/course.*'), 'delete', (options) => {
  let urls = options.url.split('/');
  let id = urls[ urls.length - 1 ];

  let n = CourseList.length;
  while (n--) {
    if (CourseList[n].courseId == id) {
      CourseList.splice(n, 1);
      break;
    }
  }
  return {
    errorMessage: '',
    statusCode: 200
  };
});

// 添加课程
let guid = 100000;
Mock.mock('mock/course/create', 'post', (options) => {
  let body = JSON.parse(options.body);
  body.courseId = guid++;

  CourseList.push(body);
  return {
    data: body,
    errorMessage: '',
    statusCode: 200
  };
});
