// import Mock from 'mockjs';
// import '@/mock/extend';

// const user = Mock.mock({
//   name: '@ADMIN',
//   avatar: '@AVATAR',
//   address: '@CITY',
//   welcome: '@WELCOME',
//   timefix: '@TIMEFIX',
//   position: '@POSITION'
// });

// Mock.mock('/login', 'post', ({body}) => {
//   let result = {};
//   const {name, password} = JSON.parse(body);

//   if (name !== 'admin' || password !== '888888') {
//     result.code = -1;
//     result.message = 'user or password error(admin/888888)';
//   } else {
//     result.code = 0;
//     result.message = Mock.mock('@TIMEFIX') + ',welcome back!';
//     result.data = {};
//     result.data.user = user;
//   }
//   return result;
// });
