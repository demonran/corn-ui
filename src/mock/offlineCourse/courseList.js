import Mock from 'mockjs';
import '@/mock/extend';

const CourseList = Mock.mock({
  'list|6': [
    {
      'courseId|+1': 1,
      courseCode: 'xxkc001',
      courseName: '少儿绘画入门班',
      courseTitle: '少儿绘画入门班',
      courseSubTitle: '少儿绘画入门班',
      courseCategory: '少儿班',
      price: 100,
      lesson: 10,
      totalAmount: 800,
      isShareBrokerage: true,
      shareBrokerageAmount: 100,
      limitStudents: 20,
      teacher: '@TEACHER',
      imageUrl: 'http://xxx.png,http:xx2.png',
      content: '<p>课程详情。。。</p>',
      beginDate: '2019-07-05',
      endDate: '2019-07-31',
      startClassTime: '09:30',
      endClassTime: '17:30'
    }
  ]
}).list;

Mock.mock('/mock/getAll', 'get', () => {
  return CourseList;
});

Mock.mock('/mock/api/course/create', 'post', () => {
  return CourseList;
});
