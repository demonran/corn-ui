import Mock from 'mockjs';
import '@/mock/course/offline';
import '@/mock/erp/teachers';
import '@/mock/erp/category';

// 设置全局延时
Mock.setup({
  timeout: '300-600'
});
