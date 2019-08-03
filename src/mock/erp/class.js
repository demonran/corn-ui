import Mock from 'mockjs';
import '@/mock/extend';

const ClassList = Mock.mock({
  'list|5': [
    {
      'dbid': '00000',
      'id|+1': 10000,
      'name': '暑期绘画1班',
      'count|20-30': 10,
      'teacher': '王老师',
      'teacherTel': '17232456789',
      'startDate':'2019-07-06',
      'endDate':'2019-08-06',
      'classTime':'xxxxx',
      'createDate':'2019-08-06'
    }
  ]
}).list;

// 查询列表
Mock.mock(RegExp('mock/class/search.*'), 'get', (options) => {
  console.log(options);
  return {
    data: {
      content: ClassList,
      total: 30,
      pageSize: 10,
      pageNum: 1
    },
    errorMessage: '',
    statusCode: 200
  };
});

// 删除
Mock.mock(RegExp('mock/class/delete.*'), 'delete', (options) => {
  let urls = options.url.split('/');
  let id = urls[ urls.length - 1 ];

  let n = ClassList.length;
  while (n--) {
    if (ClassList[n].id == id) {
        ClassList.splice(n, 1);
      break;
    }
  }
  return {
    errorMessage: '',
    statusCode: 200
  };
});

// 添加
let guid = 200000;
Mock.mock('mock/class/create', 'post', (options) => {
  let body = JSON.parse(options.body);
  body.id = guid++;
  body.count = 0;
  ClassList.push(body);
  return {
    data: body,
    errorMessage: '',
    statusCode: 200
  };
});

// 修改
Mock.mock('mock/class/update', 'put', (options) => {
  let body = JSON.parse(options.body);

  let n = ClassList.length;
  while (n--) {
    if (ClassList[n].id == body.id) {
        ClassList[n] = body;
      break;
    }
  }

  return {
    data: body,
    errorMessage: '',
    statusCode: 200
  };
});
