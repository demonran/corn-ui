import Mock from 'mockjs';
import '@/mock/extend';

const CourseList = Mock.mock({
  'list|10': [
    {
      'dbid': '00000',
      'courseId|+1': 11452681,

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

Mock.mock(RegExp('mock/offline/course/getAll.*'), 'get', () => {
  let ret = {
    data: {
      list: CourseList,
      pagination: {
        total: 50,
        pageSize: 10,
        pageNum: 1
      }
    },
    errorMessage: '',
    statusCode: 200
  };
  return ret;
});
