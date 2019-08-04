import Mock from 'mockjs';
import '@/mock/course/offline';
import '@/mock/erp/teachers';
import '@/mock/erp/category';
import '@/mock/erp/class';
import '@/mock/erp/student';

// 设置全局延时
Mock.setup({
  timeout: '300-600'
});
