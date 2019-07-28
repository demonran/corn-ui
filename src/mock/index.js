import Mock from 'mockjs';
import '@/mock/course/offline';

// 设置全局延时
Mock.setup({
  timeout: '300-600'
});
