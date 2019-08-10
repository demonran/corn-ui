import Mock from 'mockjs';
import '@/mock/extend';

const CList =  [
    {
      'categoryId': 11452681,
      'name': '音乐',
    },
    {
      'categoryId': 11452682,
      'name': '绘画',
    }
];

// 查询列表
Mock.mock(RegExp('mock/category/search.*'), 'get', (options) => {
  console.log(options);
  return {
    data: {
      content: CList,
      total: 30,
      pageSize: 10,
      pageNum: 1
    },
    errorMessage: '',
    statusCode: 200
  };
});

// 删除
Mock.mock(RegExp('mock/category/delete.*'), 'delete', (options) => {
  let urls = options.url.split('/');
  let id = urls[ urls.length - 1 ];

  let n = CList.length;
  while (n--) {
    if (CList[n].categoryId == id) {
        CList.splice(n, 1);
      break;
    }
  }
  return {
    errorMessage: '',
    statusCode: 200
  };
});

// 修改
Mock.mock(RegExp('mock/category/update'), 'put', (options) => {
    let body = JSON.parse(options.body);
    let n = CList.length;
    while (n--) {
      if (CList[n].categoryId == body.categoryId) {
          CList[n].name = body.name;
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
Mock.mock('mock/category/create', 'post', (options) => {
  let body = JSON.parse(options.body);
  body.categoryId = guid++;
  CList.push(body);

  console.log( body );

  return {
    data: body,
    errorMessage: '',
    statusCode: 200
  };
});
